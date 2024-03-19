// import React, { useState } from 'react';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Xử lý dữ liệu gửi đi ở đây (ví dụ: gửi đến API hoặc xử lý ở phía máy chủ)
//     console.log('Submitted data:', formData);
//   };

//   return (
//     <div className="bg-gray-100">
//       <div className="container mx-auto pt-16">
//         <header className="bg-white py-4 border-b border-gray-300">
//           <div className="flex justify-between items-center">
//             <div className="flex space-x-4 pl-10">
//               <h2 className="text-3xl font-semibold mb-2"> Liên hệ </h2>
//             </div>
//           </div>
//         </header>
//         <main className="grid grid-cols-12 gap-8 p-8">
//           {/* Cột trái */}
//           <div className="col-span-8">
//             {/* Tin nổi bật */}
//             <div className="mb-8">
//               <form
//                 className="bg-white p-6 rounded-md shadow-md mb-4"
//                 onSubmit={handleSubmit}
//               >
//                 <h2 className="text-xl font-semibold mb-4">Liên hệ chúng tôi</h2>
//                 <div className="mb-4">
//                   <label htmlFor="name" className="block text-gray-600">
//                     Họ và tên:
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 p-2 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="email" className="block text-gray-600">
//                     Email:
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 p-2 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="message" className="block text-gray-600">
//                     Nội dung:
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     rows="4"
//                     className="w-full border border-gray-300 p-2 rounded-md"
//                     required
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//                 >
//                   Gửi
//                 </button>
//               </form>
//             </div>
//             {/* Tin khác */}
//             <div className="grid grid-cols-2 gap-4">
              
//             </div>
//           </div>

//           {/* Cột phải */}
//           <div className="col-span-4">
//             <iframe
//               width="460"
//               height="350"
//               src="https://www.openstreetmap.org/export/embed.html?bbox=108.10229301452638%2C16.03302758803864%2C108.21267127990724%2C16.089444193336433&amp;layer=mapnik"
//               className="border-1 border-solid border-black"
//             ></iframe>

//             {/* Thông tin liên hệ */}
//             <div className="bg-white p-4 rounded-md shadow-md mb-4">
//               <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
//               <p className="text-gray-600">
//                 <strong>Địa chỉ:</strong> 137 Nguyễn Thị Thập, Liên chiểu, Đà Nẵng
//               </p>
//               <p className="text-gray-600">
//                 <strong>Email:</strong> salephone@gmail.com
//               </p>
//               <p className="text-gray-600">
//                 <strong>Điện thoại:</strong> (+84) 123456789
//               </p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Contact;
import React, { useState } from 'react';

const ShowMoreContent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w mx-auto mt-20">
     
      <p className={`leading-relaxed ${isExpanded ? 'block' : 'line-clamp-4 bg-gradient-to-t from-[#f4f1f1] from-10% to-[#ffffff] to-90%'}`}>
      E​xness (SC) Ltd là Nhà giao dịch chứng khoán được đăng ký tại Seychelles với số đăng ký 8423606-1 và được Cơ quan dịch vụ tài chính (FSA) cấp phép với số giấy phép SD025. Văn phòng đăng ký của E​xness (SC) Ltd đặt tại Tòa nhà CT 9A, tầng 2, Providence, Mahe, Seychelles.

Exness B.V. là Công ty trung gian chứng khoán được đăng ký tại Curaçao với số đăng ký 148698 (0) và được Ngân hàng Trung ương Curaçao và Sint Maarten (CBCS) cấp phép với giấy phép số 0003LSI. Văn phòng đăng ký của Exness B.V. tại Emancipatie Boulevard Dominico F. “Don” Martina 31, Curaçao.

Exness (VG) Ltd được Ủy ban Dịch vụ Tài chính (FSC) cấp phép tại BVI với số đăng ký 2032226 và số giấy phép kinh doanh đầu tư SIBA/L/20/1133. Văn phòng đăng ký của Exness (VG) Ltd tại Trinity Chambers, P.O. Box 4301, Road town, Tortola, BVI.

Các cơ quan nói trên được ủy quyền chính thức để hoạt động theo thương hiệu và nhãn hiệu của Exness.

Cảnh Báo Rủi Ro Chung: Các dịch vụ của chúng tôi liên quan đến các sản phẩm phái sinh phức tạp được giao dịch bên ngoài sàn giao dịch. Những sản phẩm này có mức rủi ro thua lỗ cao và nhanh do có sử dụng đòn bẩy, nên có thể không thích hợp đối với tất cả các nhà đầu tư. Trong mọi trường hợp, Exness sẽ không chịu trách nhiệm pháp lý đối với bất kỳ cá nhân hay tổ chức nào về bất kỳ tổn thất hay thiệt hại nào hoàn toàn hoặc một phần gây ra bởi, phát sinh từ, hoặc liên quan đến bất kỳ hoạt động đầu tư nào. Tìm hiểu thêm.

Các thực thể ở trên không cung cấp dịch vụ cho cư dân của một số khu vực pháp lý nhất định bao gồm Hoa Kỳ, Iran, Triều Tiên, Châu Âu, Vương quốc Anh và các quốc gia khác.

Thông tin trên trang web này không phải là lời khuyên đầu tư hoặc đề xuất hoặc chào mời tham gia vào bất kỳ hoạt động đầu tư nào.

Chỉ có thể sao chép thông tin trên trang web này khi có sự cho phép rõ bằng văn bản của Exness.

Exness tuân thủ Tiêu chuẩn bảo mật dữ liệu ngành thẻ thanh toán (PCI DSS) để đảm bảo tính bảo mật và quyền riêng tư của bạn. Chúng tôi thực hiện quét lỗ hổng và kiểm thử thâm nhập thường xuyên đối với mô hình kinh doanh của mình theo các yêu cầu của PCI DSS.

¹Tại Exness, 95% số lần rút tiền được xử lý tức thời (dưới 1 phút). Sau khi tiền của bạn rời khỏi quyền quản lý của chúng tôi, nhà cung cấp dịch vụ thanh toán mà bạn đã chọn sẽ xử lý tiền và ghi có vào tài khoản của bạn.
       
      </p>
      {!isExpanded && (
        <button onClick={toggleExpand} className="mt-2 py-2 px-4 border rounded text-blue-500 focus:outline-none">
          Show more
        </button>
      )}
      {isExpanded && (
        <button onClick={toggleExpand} className="mt-2 py-2 px-4 border rounded text-blue-500 focus:outline-none">
          Show less
        </button>
      )}
    </div>
  );
};

export default ShowMoreContent;

