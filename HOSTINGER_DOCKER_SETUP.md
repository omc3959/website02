# 🔧 إعداد Docker على Hostinger - الطريقة الصحيحة

دليل محدد للنشر على Hostinger مع احترام نظام التخزين الخاص به.

## 📁 نظام التخزين في Hostinger

### المسارات الأساسية

```
/var/lib/docker/          ← صور وحاويات Docker (لا تعدّل يدويًا)
/docker/website02/        ← مجلد التطبيق الخاص بك
  ├── data/              ← البيانات المستمرة
  ├── logs/              ← ملفات السجلات
  └── node_modules/      ← مكتبات Node.js
```

## 🚀 خطوات الإعداد الصحيحة

### الخطوة 1: الاتصال بالخادم

```bash
ssh root@your_server_ip
# أو
ssh username@your_server_ip
```

### الخطوة 2: الذهاب لمجلد المشروع

```bash
# إذا كنت تستخدم /home
cd /home/your_username

# أو إذا كنت تستخدم /root
cd /root
```

### الخطوة 3: استنساخ المشروع

```bash
git clone https://github.com/omc3959/website02.git
cd website02
```

### الخطوة 4: تشغيل سكريبت الإعداد

```bash
# جعل السكريبت قابل للتنفيذ
chmod +x hostinger-setup.sh

# تشغيله كـ root
sudo ./hostinger-setup.sh
```

**ما يقوم به السكريبت:**
- ✅ إنشاء مجلدات التخزين في `/docker/website02/`
- ✅ تعيين الصلاحيات الصحيحة
- ✅ بناء صورة Docker
- ✅ (اختياري) إنشاء خدمة systemd

### الخطوة 5: إعداد المتغيرات

```bash
# نسخ ملف المثال
cp .env.hostinger.example .env

# تعديل البيانات
nano .env
```

**أضف:**
```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-domain.com
ODOO_URL=https://your-odoo.com
ODOO_DATABASE=your_db
ODOO_USERNAME=your_user@example.com
ODOO_PASSWORD=your_password
```

### الخطوة 6: تشغيل التطبيق

```bash
# استخدم docker-compose.hostinger.yml
docker-compose -f docker-compose.hostinger.yml up -d

# تحقق من الحالة
docker-compose -f docker-compose.hostinger.yml ps

# شاهد الـ Logs
docker-compose -f docker-compose.hostinger.yml logs -f web
```

## 📊 هيكل التخزين

### قبل التشغيل
```
/docker/website02/
├── data/              (فارغ - سيتم ملأه)
├── logs/              (فارغ - سيتم ملأه)
└── node_modules/      (فارغ - سيتم ملأه)
```

### بعد التشغيل
```
/docker/website02/
├── data/
│   └── (بيانات التطبيق)
├── logs/
│   ├── app.log
│   ├── error.log
│   └── (ملفات السجلات الأخرى)
└── node_modules/
    └── (جميع المكتبات المثبتة)
```

## 🔄 الأوامر المهمة

### التحكم بالـ Container

```bash
# تشغيل
docker-compose -f docker-compose.hostinger.yml up -d

# إيقاف
docker-compose -f docker-compose.hostinger.yml stop

# إعادة تشغيل
docker-compose -f docker-compose.hostinger.yml restart

# إيقاف كامل (حذف Container)
docker-compose -f docker-compose.hostinger.yml down

# عرض الحالة
docker-compose -f docker-compose.hostinger.yml ps
```

### المراقبة والسجلات

```bash
# الـ Logs الحية
docker-compose -f docker-compose.hostinger.yml logs -f web

# آخر 50 سطر
docker-compose -f docker-compose.hostinger.yml logs --tail=50 web

# حفظ الـ Logs في ملف
docker-compose -f docker-compose.hostinger.yml logs web > /docker/website02/logs/docker.log

# موارد النظام
docker stats
```

### الصيانة

```bash
# دخول الـ Container
docker-compose -f docker-compose.hostinger.yml exec web sh

# تنفيذ أمر داخل الـ Container
docker-compose -f docker-compose.hostinger.yml exec web npm --version

# حذف البيانات المتراكمة
docker system prune -a

# حذف الـ volumes (احذر! سيحذف البيانات)
docker volume prune
```

## 🔐 النسخ الاحتياطية

### النسخ من Hostinger

```bash
# تأكد من إيقاف التطبيق أولاً (اختياري لكن آمن أكثر)
docker-compose -f docker-compose.hostinger.yml stop

# نسخ مجلد البيانات
tar -czf website02-backup-$(date +%Y%m%d-%H%M%S).tar.gz /docker/website02/

# نقل النسخة الاحتياطية (اختياري)
# scp website02-backup-*.tar.gz local-machine:~/backups/

# استئناف التطبيق
docker-compose -f docker-compose.hostinger.yml up -d
```

### استعادة من نسخة احتياطية

```bash
# استخراج النسخة
tar -xzf website02-backup-20240115-143022.tar.gz -C /

# إعادة تشغيل
docker-compose -f docker-compose.hostinger.yml up -d
```

## 🌐 إعداد Nginx و SSL

### إنشاء إعداد Nginx

```bash
# إنشاء الملف
sudo nano /etc/nginx/sites-available/website02

# أضف هذا المحتوى:
```

```nginx
upstream website02_backend {
    server localhost:3000;
}

server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    # تحويل HTTP إلى HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }

    # للمصادقة مع Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Logging
    access_log /docker/website02/logs/nginx-access.log;
    error_log /docker/website02/logs/nginx-error.log;

    # Reverse Proxy
    location / {
        proxy_pass http://website02_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }
}
```

### تفعيل الإعداد

```bash
# إنشاء رابط رمزي
sudo ln -s /etc/nginx/sites-available/website02 /etc/nginx/sites-enabled/

# اختبار الإعداد
sudo nginx -t

# إعادة تشغيل Nginx
sudo systemctl restart nginx
```

### إضافة SSL

```bash
# تثبيت Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# الحصول على شهادة
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# التحقق من التجديد التلقائي
sudo systemctl enable certbot.timer
```

## 🔄 التحديثات والنشر

### تحديث المشروع

```bash
# 1. سحب آخر التغييرات
git pull origin main

# 2. إعادة بناء الصورة
docker-compose -f docker-compose.hostinger.yml build --no-cache

# 3. إعادة التشغيل
docker-compose -f docker-compose.hostinger.yml up -d

# 4. التحقق
docker-compose -f docker-compose.hostinger.yml logs -f web
```

## 🐛 استكشاف الأخطاء

### المشكلة: "Permission denied"

```bash
# تحقق من الصلاحيات
ls -la /docker/website02/

# أعدّ الصلاحيات
sudo chmod -R 777 /docker/website02/
```

### المشكلة: "Cannot connect to Docker daemon"

```bash
# تحقق من حالة Docker
systemctl status docker

# بدء Docker إذا لم يكن يعمل
sudo systemctl start docker

# إضافة المستخدم لمجموعة docker
sudo usermod -aG docker $USER
newgrp docker
```

### المشكلة: "Port 3000 already in use"

```bash
# ابحث عن العملية التي تستخدم الـ port
netstat -tlnp | grep 3000

# أو استخدم port مختلف في docker-compose.hostinger.yml
# غيّر: ports: - "3001:3000"
```

### المشكلة: "Out of disk space"

```bash
# تحقق من المساحة
df -h

# حذف الحاويات والصور غير المستخدمة
docker system prune -a

# إن لم ينفع، افحص حجم /docker/website02/
du -sh /docker/website02/
```

## 📈 الأداء

### تحسين الأداء

```bash
# استخدم production mode في .env
NODE_ENV=production

# زيادة حد الذاكرة في docker-compose.hostinger.yml
# deploy.resources.limits.memory: 4G

# تثبيت nginx caching (اختياري)
# يقلل الضغط على التطبيق
```

## ✅ Checklist الإعداد

- [ ] تثبيت Docker و Docker Compose
- [ ] استنساخ المشروع
- [ ] تشغيل `hostinger-setup.sh`
- [ ] إعداد `.env`
- [ ] تشغيل `docker-compose -f docker-compose.hostinger.yml up -d`
- [ ] اختبار التطبيق على `http://localhost:3000`
- [ ] إعداد Nginx و SSL
- [ ] اختبار HTTPS
- [ ] إعداد النسخ الاحتياطية
- [ ] اختبار المراقبة والـ Logs

## 📞 الدعم

للمساعدة:
- تحقق من الـ Logs: `docker-compose -f docker-compose.hostinger.yml logs`
- افحص حالة النظام: `docker stats`
- اقرأ [HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md)

---

**تطبيقك جاهز الآن على Hostinger! 🎉**
