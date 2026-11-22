# 🌐 نشر OdooHub على Hostinger - الدليل الكامل

دليل تفصيلي خطوة بخطوة لنشر التطبيق على خادم Hostinger VPS

## 📋 المتطلبات

- حساب Hostinger VPS (Linux Ubuntu 22.04 LTS موصى به)
- معرّف المستخدم وكلمة المرور
- نطاق (Domain)
- Google OAuth Credentials
- بيانات Odoo

## 🚀 التثبيت الأساسي

### الخطوة 1: الاتصال بالخادم

```bash
# الاتصال عبر SSH
ssh root@your_server_ip
# أو
ssh username@your_server_ip
```

### الخطوة 2: تحديث النظام

```bash
# تحديث الحزم
sudo apt-get update && sudo apt-get upgrade -y

# تثبيت الأدوات الأساسية
sudo apt-get install -y \
  curl \
  wget \
  git \
  nano \
  htop \
  unzip \
  build-essential \
  python3-dev \
  postgresql \
  postgresql-contrib
```

### الخطوة 3: تثبيت Docker

```bash
# تنزيل وتشغيل سكريبت التثبيت
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# إضافة المستخدم إلى مجموعة docker
sudo usermod -aG docker $USER
newgrp docker

# التحقق من التثبيت
docker --version
```

### الخطوة 4: تثبيت Docker Compose

```bash
# تحميل آخر نسخة
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# منح صلاحيات التنفيذ
sudo chmod +x /usr/local/bin/docker-compose

# التحقق
docker-compose --version
```

## 📁 إعداد المشروع

### الخطوة 5: نسخ المشروع

```bash
# إنشاء مجلد للمشاريع
mkdir -p /home/$USER/projects
cd /home/$USER/projects

# استنساخ المشروع من GitHub
git clone https://github.com/omc3959/website02.git
cd website02

# تعيين الملكية
sudo chown -R $USER:$USER /home/$USER/projects/website02
```

### الخطوة 6: إعداد متغيرات البيئة

```bash
# نسخ ملف المثال
cp .env.local.example .env

# فتح الملف للتعديل
nano .env
```

**أضف البيانات:**

```env
# Google OAuth - من https://console.cloud.google.com
GOOGLE_CLIENT_ID=xxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxx

# NextAuth
NEXTAUTH_SECRET=your_secret_key_$(openssl rand -hex 32)
NEXTAUTH_URL=https://your-domain.com

# Odoo Configuration
ODOO_URL=https://your-odoo-instance.com
ODOO_DATABASE=your_database_name
ODOO_USERNAME=your_odoo_user@example.com
ODOO_PASSWORD=your_odoo_password
```

**احفظ:** `Ctrl+X` ثم `Y` ثم `Enter`

## 🐳 تشغيل Docker

### الخطوة 7: بناء وتشغيل

```bash
# بناء الصورة (قد يأخذ 10-15 دقيقة)
docker-compose build

# تشغيل في الخلفية
docker-compose up -d

# التحقق من الحالة
docker-compose ps

# شاهد الـ Logs
docker-compose logs -f web
```

**انتظر حتى ترى:**
```
odoo-hub-app | ready - started server on 0.0.0.0:3000
```

## 🌍 إعداد Nginx و SSL

### الخطوة 8: تثبيت Nginx

```bash
# التثبيت
sudo apt-get install -y nginx certbot python3-certbot-nginx

# بدء الخدمة
sudo systemctl start nginx
sudo systemctl enable nginx
```

### الخطوة 9: إنشاء ملف إعداد Nginx

```bash
# إنشاء الملف
sudo nano /etc/nginx/sites-available/odoo-hub
```

**أضف هذا المحتوى:**

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS Configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Certificates (ستُضاف بـ Certbot)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Logging
    access_log /var/log/nginx/odoo-hub-access.log;
    error_log /var/log/nginx/odoo-hub-error.log;

    # Reverse Proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        
        # WebSocket Support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching (optional)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 30d;
        proxy_cache_bypass $http_pragma $http_authorization;
        add_header Cache-Control "public, max-age=2592000";
    }
}
```

**احفظ:** `Ctrl+X` ثم `Y` ثم `Enter`

### الخطوة 10: تفعيل الإعداد

```bash
# تفعيل الموقع
sudo ln -s /etc/nginx/sites-available/odoo-hub /etc/nginx/sites-enabled/

# حذف الإعداد الافتراضي (اختياري)
sudo rm /etc/nginx/sites-enabled/default

# اختبار الإعداد
sudo nginx -t

# إعادة تشغيل Nginx
sudo systemctl restart nginx
```

### الخطوة 11: إضافة SSL Certificate

```bash
# الحصول على شهادة مجانية من Let's Encrypt
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# متابعة التعليمات:
# - اقبل شروط الخدمة
# - أدخل بريدك الإلكتروني
# - اختر إذا كنت تريد إعادة التوجيه

# التحقق من التجديد التلقائي
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

## ✅ التحقق والاختبار

### الخطوة 12: اختبر التطبيق

```bash
# 1. تحقق من DNS (انتظر 24 ساعة إذا كنت جديداً)
nslookup your-domain.com

# 2. اختبر الاتصال
curl -I http://localhost:3000

# 3. زيارة الموقع
# افتح في المتصفح: https://your-domain.com
```

**يجب أن ترى:**
- ✅ صفحة تسجيل الدخول مع زر Google
- ✅ شهادة SSL صحيحة (بدون تحذيرات)
- ✅ الاتصال بـ Odoo يعمل

## 🔄 إدارة التطبيق

### مراقبة التطبيق

```bash
# الـ Logs الحية
docker-compose logs -f web

# حالة الـ Containers
docker-compose ps

# موارد النظام
docker stats

# استخدام الذاكرة والمعالج
htop
```

### إعادة التشغيل

```bash
# إيقاف التطبيق
docker-compose stop

# بدء التطبيق
docker-compose start

# إعادة البناء والتشغيل
docker-compose down
docker-compose up -d
```

### التحديثات

```bash
# اسحب آخر التغييرات من GitHub
git pull origin main

# أعد البناء
docker-compose build --no-cache

# إعادة التشغيل
docker-compose up -d

# شاهد الـ Logs
docker-compose logs -f web
```

## 🔐 الأمان

### تأمين الخادم

```bash
# إعداد جدار الحماية
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable

# تأمين ملف .env
chmod 600 .env

# تأمين المشروع
chmod 755 /home/$USER/projects/website02
```

### النسخ الاحتياطية

```bash
# إنشاء نسخة احتياطية
tar -czf ~/odoo-hub-backup-$(date +%Y%m%d).tar.gz \
  /home/$USER/projects/website02

# نقل إلى مكان آمن (optional)
# scp ~/odoo-hub-backup-*.tar.gz local-machine:~/backups/
```

## 📊 المراقبة

### إعداد المراقبة (اختياري)

```bash
# تثبيت Monitoring tools
sudo apt-get install -y sysstat iotop

# مراقبة الـ Logs
journalctl -f -u nginx

# مراقبة القرص
df -h
du -sh /home/$USER/projects/website02
```

## 🐛 استكشاف الأخطاء

### المشكلة: الموقع لا يفتح

```bash
# 1. تحقق من DNS
nslookup your-domain.com

# 2. تحقق من الـ port 443
netstat -tlnp | grep 443

# 3. تحقق من Nginx
sudo systemctl status nginx
sudo nginx -t

# 4. تحقق من الـ Container
docker-compose ps
docker-compose logs web
```

### المشكلة: الـ Container يتوقف

```bash
# شاهد الأخطاء
docker-compose logs web

# تحقق من الموارد
docker stats

# إعادة البناء
docker-compose build --no-cache
docker-compose up -d
```

### المشكلة: مشاكل Odoo

```bash
# تحقق من المتغيرات
docker-compose exec web env | grep ODOO

# اختبر الاتصال
curl -v https://your-odoo-instance.com

# افحص الـ Logs
docker-compose logs web | grep -i odoo
```

## 🎯 Checklist النشر

- [ ] تثبيت Docker و Docker Compose
- [ ] استنساخ المشروع
- [ ] إعداد `.env`
- [ ] بناء وتشغيل Docker
- [ ] تثبيت Nginx و Certbot
- [ ] إعداد SSL
- [ ] اختبار HTTPS
- [ ] اختبار Google OAuth
- [ ] اختبار Odoo Integration
- [ ] إعداد النسخ الاحتياطية
- [ ] إعداد المراقبة

## 📚 الأوامر السريعة

```bash
# الحالة
docker-compose ps

# الـ Logs
docker-compose logs -f web

# إعادة التشغيل
docker-compose restart

# الإيقاف
docker-compose stop

# التحديث
git pull && docker-compose build && docker-compose up -d

# الدخول للـ Container
docker-compose exec web sh

# تنظيف الموارد
docker system prune -a
```

## 📞 الدعم

للمشاكل والاستفسارات:
- توثيق Hostinger: https://www.hostinger.com/help
- توثيق Docker: https://docs.docker.com/
- GitHub Issues: https://github.com/omc3959/website02/issues

---

**تهانينا! تطبيقك جاهز للعمل على Hostinger! 🎉**

**الخطوات التالية:**
1. انتظر نشر DNS (24 ساعة)
2. اختبر https://your-domain.com
3. راقب الـ Logs أول 24 ساعة
4. أضف Monitoring/Backups اللازمة
