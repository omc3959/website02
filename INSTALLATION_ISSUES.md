# حل مشاكل التثبيت

إذا واجهت مشاكل في تثبيت الحزم على Windows، جرب الحلول التالية:

## ✅ الحل 1: استخدام npm ci (موصى به)

```bash
npm ci
```

## ✅ الحل 2: مسح وإعادة تثبيت

```bash
# احذف node_modules و package-lock.json
rm -rf node_modules package-lock.json

# أعد التثبيت
npm install
```

## ✅ الحل 3: استخدام yarn بدلاً من npm

```bash
# تثبيت yarn
npm install -g yarn

# استخدام yarn للتثبيت
yarn install
```

## ✅ الحل 4: تعطيل IPv6

في بعض أحيان قد تكون مشاكل الشبكة السبب:

```bash
npm config set ipv6 false
npm install
```

## ✅ الحل 5: تثبيت الحزم يدويًا

إذا استمرت المشاكل، ثبّت الحزم واحدة تلو الأخرى:

```bash
npm install next@16.4.6
npm install react@19.3.0 react-dom@19.3.0
npm install -D typescript@5
npm install -D @types/node @types/react @types/react-dom
npm install -D tailwindcss@4.3.3 @tailwindcss/turbopack@4.3.3
npm install -D eslint @next/eslint-plugin-next
npm install next-auth@5 axios lucide-react
```

## ✅ الحل 6: استخدام PowerShell كـ Administrator

افتح PowerShell كمسؤول وجرّب:

```powershell
npm install --force
```

---

بعد التثبيت بنجاح، شغّل:

```bash
npm run dev
```

افتح `http://localhost:3000` في متصفحك.
