# KOC Healthcare Case

Bu proje, **ThingsBoard Cloud** üzerinde çalışan bir sağlık izleme sistemine simüle edilmiş sensör verileri sağlamayı amaçlamaktadır. İki temel sensör simülasyonu içerir:
**Heart Rate Sensor** ve **Oxygen Sensor**. Simülatörler, ThingsBoard üzerinde tanımlı cihazlara veri gönderir ve bu veriler ThingsBoard Dashboard'ları üzerinden anlık olarak takip edilir.

Uygulama, AWS Ubuntu sunucusunda canlı olarak yayınlanmaktadır.

🌐 **Canlı Demo Linki**: [http://3.8.198.10](http://3.8.198.10)

---

## 🚀 Proje Amacı

ThingsBoard Cloud üzerinde çalışan bir IoT dashboard sistemi kurarak, sağlık verilerini (kalp atış hızı ve oksijen seviyesi) simüle etmek ve görselleştirmek.  
Kullanıcı, oluşturulan cihazlara veri göndererek, ThingsBoard üzerinden bu verileri takip edebilir ve alarmlar tetiklenebilir.

---

## 🏗️ Kullanılan Teknolojiler

### Frontend

- **Framework**: React (TypeScript)
- **UI Kit**: Mantine UI
- **Veri Gönderimi**: Axios (REST API ile ThingsBoard cihazlarına)
- **State Management & Hooks**: React Hooks, @uidotdev/usehooks
- **Bildirimler**: React Hot Toast, Mantine Notifications
- **Routing**: React Router DOM
- **Build & Tooling**: Vite, TypeScript, ESLint

### Backend

- **Runtime**: Node.js
- **Amaç**: ThingsBoard cihazlarına otomatik veri gönderimi sağlamak ve belirli senaryoları simüle etmek.
- **Veri Gönderimi**: REST API üzerinden ThingsBoard cihazlarına telemetry verisi sağlar.
- **Konum**: Aynı AWS Ubuntu sunucusunda frontend ile birlikte çalışmaktadır.

### Sunucu

- **Barındırma**: AWS EC2 Ubuntu Server
- **Frontend ve Backend** aynı sunucu üzerinde deploy edilmiştir.

---

## 📦 Proje Yapısı

Proje iki ana bileşenden oluşur:

### 1️⃣ Frontend

- Kullanıcı arayüzü sağlar.
- Kullanıcı bilgileri **React Context API** içerisinde ve **localStorage** üzerinde tutulur. Context tüm uygulamayı sarmaktadır. Bu sayede `tokenExp` süresi dolmadan kullanıcı tekrar giriş yapmak zorunda kalmaz.
- Manuel veri gönderimi yapılabilir. Kullanıcı, ThingsBoard cihazlarına **Heart Rate** ve **Oxygen Sensor** verilerini doğrudan frontend üzerinden gönderebilir.
- Dashboard izleme linkleri ve ThingsBoard cihaz bilgileri arayüzde gösterilmektedir.
- Uygulama **NGINX** üzerinden servis edilmektedir.
- Frontend React uygulaması **Vite** ile build edilmiştir ve **AWS EC2 Ubuntu Server** üzerindeki NGINX tarafından static dosya olarak sunulmaktadır.

### 2️⃣ Backend

- Node.js ile geliştirilmiştir.
- ThingsBoard cihazlarına belirli aralıklarla telemetry verisi gönderir.
- PostgreSQL veritabanı kullanılarak tüm kullanıcı bilgileri ve sensör verileri kalıcı olarak saklanmaktadır.
- Backend servisleri **PM2** süpervizör aracıyla yönetilmektedir.  
  ➔ Sunucu başlatıldığında veya yeniden deploy durumunda, aşağıdaki komut ile backend servisi yönetilir:

  pm2 restart api-app

---

## 🔗 Repository Bağlantıları

- **Frontend (React + TypeScript)**: [https://github.com/xyzCoding34/koc-healthcare-case-ui.git](https://github.com/xyzCoding34/koc-healthcare-case-ui.git)
- **Backend (Node.js API + PostgreSQL)**: [https://github.com/xyzCoding34/koc-healthcare-api.git](https://github.com/xyzCoding34/koc-healthcare-api.git)
