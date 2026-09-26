export default function handler(req, res) {
  res.status(200).json({
    name: "Sunflower Auto Garage",
    nameArabic: "كراج سنفلور للسيارات",
    phoneDisplay: process.env.GARAGE_PHONE_DISPLAY || "+971 55 153 1345",
    whatsappNumber: process.env.GARAGE_WHATSAPP_NUMBER || "971551531345",
    address: "Umm Ramool, Dubai, UAE",
    location: { lat: 25.2242667, lng: 55.3668534 },
  });
}
