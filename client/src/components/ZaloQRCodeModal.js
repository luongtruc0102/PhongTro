import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const ZaloQRCodeModal = ({ phone, onClose }) => {
  if (!phone) return null;

  const zaloLink = `https://zalo.me/${phone}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      {/* Overlay */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl text-center relative animate-fadeIn scale-95 transform transition-all duration-300">

        <h2 className="text-2xl font-semibold mb-4 text-secondary4">
          Quét QR để nhắn Zalo
        </h2>

        {/* QR code */}
        <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-md inline-block">
          <QRCodeCanvas value={zaloLink} size={220} />
        </div>

        {/* Số điện thoại */}
        <p className="mt-3 text-gray-700 font-medium">{phone}</p>

        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="mt-5 bg-secondary4 text-white px-5 py-2 rounded-lg hover:bg-secondary3 transition"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default ZaloQRCodeModal;
