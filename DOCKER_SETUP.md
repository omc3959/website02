# 🐳 Docker Setup Guide - OdooHub

دليل شامل لتشغيل OdooHub في Docker على Hostinger

## 📋 المتطلبات

- Docker و Docker Compose مثبتة
- وصول SSH إلى خادم Hostinger
- بيانات Google OAuth
- بيانات الاتصال بـ Odoo

## 🚀 الخطوة 1: الإعداد المحلي (اختياري)

اختبر Docker محلياً قبل النشر:

### أ) أنشئ ملف `.env.docker`

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# Odoo
ODOO_URL=https://your-odoo-instance.com
ODOO_DATABASE=your_database
ODOO_USERNAME=your_username@example.com
ODOO_PASSWORD=your_password
```

### ب) بناء وتشغيل الـ Container

```bash
# بناء الصورة
docker build -t odoo-hub:latest .

# تشغيل الـ Container
docker run -p 3000:3000 \
  --env-file .env.docker \
  --name odoo-hub-local \
  odoo-hub:latest
```

### ج) أو استخدم Docker Compose

```bash
# أنسخ ملف البيئة
cp .env.local.example .env

# عدّل .env بـ بيانات الإعداد الصحيحة
nano .env

# شغّل Docker Compose
docker-compose up -d

# شاهد الـ Logs
docker-compose logs -f web
```

## 🌐 الخطوة 2: النشر على Hostinger

### أ) الاتصال بالخادم

```bash
ssh your_username@your_hostinger_server.com
```

### ب) نسخ المشروع

```bash
# افتح المجلد المناسب
cd /home/your_username/

# انسخ المشروع من GitHub
git clone https://github.com/omc3959/website02.git
cd website02
```

### ج) إعداد متغيرات البيئة

```bash
# أنشئ ملف .env
nano .env

# أضف البيانات:
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=https://your-domain.com
ODOO_URL=https://your-odoo-instance.com
ODOO_DATABASE=your_database
ODOO_USERNAME=your_username@example.com
ODOO_PASSWORD=your_password

# احفظ واخرج: Ctrl+X ثم Y ثم Enter
```

### د) تثبيت Docker و Docker Compose (إذا لم يكن مثبتاً)

```bash
# تثبيت Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# أضف مستخدمك إلى مجموعة docker
sudo usermod -aG docker $USER
newgrp docker

# تثبيت Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# تحقق من التثبيت
docker --version
docker-compose --version
```

## 🔧 الخطوة 3: بناء وتشغيل الـ Container

```bash
# تحديث الصور الأساسية
docker-compose pull

# بناء الصورة
docker-compose build --no-cache

# تشغيل في الخلفية
docker-compose up -d

# تحقق من الحالة
docker-compose ps

# شاهد الـ Logs
docker-compose logs -f web
```

## 🌍 الخطوة 4: إعداد النطاق و SSL

### أ) إذا كنت تستخدم Hostinger Control Panel

1. اذهب إلى "Domains"
2. أضف نطاقك الجديد
3. أشر DNS إلى خادم Hostinger
4. انتظر التحديث (عادة 24 ساعة)

### ب) إعداد Reverse Proxy (Nginx)

```bash
# تثبيت Nginx (إذا لم يكن مثبتاً)
sudo apt-get update
sudo apt-get install nginx -y

# أنشئ ملف إعداد
sudo nano /etc/nginx/sites-available/odoo-hub

# أضف هذا المحتوى:
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# فعّل الإعداد
sudo ln -s /etc/nginx/sites-available/odoo-hub /etc/nginx/sites-enabled/

# اختبر الإعداد
sudo nginx -t

# أعد تشغيل Nginx
sudo systemctl restart nginx
```

### ج) إضافة SSL Certificate (Certbot)

```bash
# تثبيت Certbot
sudo apt-get install certbot python3-certbot-nginx -y

# الحصول على شهادة SSL
sudo certbot --nginx -d your-domain.com

# تحديث تلقائي
sudo systemctl enable certbot.timer
```

## 📊 مراقبة التطبيق

### عرض الـ Logs

```bash
# الـ Logs الحالية
docker-compose logs web

# الـ Logs الحية
docker-compose logs -f web

# آخر 100 سطر
docker-compose logs --tail=100 web
```

### التحقق من الحالة

```bash
# حالة الـ Containers
docker-compose ps

# موارد النظام
docker stats

# دخول الـ Container
docker-compose exec web sh
```

### إعادة التشغيل

```bash
# إيقاف التطبيق
docker-compose stop

# حذف الـ Containers
docker-compose down

# بدء من جديد
docker-compose up -d
```

## 🔄 التحديثات والنشر

### تحديث المشروع

```bash
# اسحب آخر التغييرات
git pull origin main

# أعد بناء الصورة
docker-compose build --no-cache

# أعد التشغيل
docker-compose up -d

# شاهد الـ Logs
docker-compose logs -f web
```

## 🐛 استكشاف الأخطاء

### المشكلة: الـ Container لا يبدأ

```bash
# شاهد الأخطاء
docker-compose logs web

# تحقق من المتغيرات
docker-compose exec web env | grep -E "GOOGLE|ODOO|NEXTAUTH"

# حاول إعادة البناء
docker-compose build --no-cache
docker-compose up -d
```

### المشكلة: الموقع لا يفتح

```bash
# تحقق من الـ port
netstat -tlnp | grep 3000

# تحقق من Nginx
sudo systemctl status nginx
sudo nginx -t

# تحقق من DNS
nslookup your-domain.com
```

### المشكلة: مشاكل الذاكرة

```bash
# شاهد الموارد
docker stats

# قلل حد الذاكرة في docker-compose.yml
# deploy.resources.limits.memory
```

## 📈 الأداء والأمان

### أفضل الممارسات

1. **استخدم `.env` بحذر**
   - لا تُلتزم `.env` إلى Git
   - استخدم متغيرات آمنة

2. **حدّث الصور الأساسية بانتظام**
   ```bash
   docker-compose pull
   docker-compose build --no-cache
   docker-compose up -d
   ```

3. **راقب الـ Logs**
   ```bash
   docker-compose logs -f web
   ```

4. **أنشئ نسخ احتياطية**
   ```bash
   # احفظ المشروع
   tar -czf odoo-hub-backup.tar.gz /home/your_username/website02
   ```

## 🔐 الأمان

### تحديد الصلاحيات

```bash
# تأمين ملف .env
chmod 600 .env

# تأمين المشروع
chmod 755 /home/your_username/website02
```

### جدران الحماية

```bash
# السماح بـ SSH فقط
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 📚 الأوامر السريعة

```bash
# بدء التطبيق
docker-compose up -d

# إيقاف التطبيق
docker-compose down

# إعادة التشغيل
docker-compose restart

# عرض الـ Logs
docker-compose logs -f

# دخول الـ Container
docker-compose exec web sh

# تنظيف الموارد
docker system prune -a

# حفظ الصورة
docker save odoo-hub:latest > odoo-hub.tar

# تحميل الصورة
docker load < odoo-hub.tar
```

## 📞 المساعدة

للمزيد من المعلومات:
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Guide](https://docs.docker.com/compose/)
- [Hostinger VPS Docs](https://www.hostinger.com/help)

---

**تم! تطبيقك جاهز للعمل على Hostinger! 🚀**
