// data/featured.ts

import { FeaturedData } from "../types/featured";
import { ProjectDetail } from "../types/project";

export const featuredData: FeaturedData = {
  title: "Featured",
  items: [
    {
      id: 1,
      title: "Seeson Hanoi IRL Flagship Store",
      slug: "seeson-hanoi-irl-flagship-store",
      category: "Thiết kế và thi công",
      excerpt: "Công trình nằm ngay giao lộ ở quận Đống Đa, kẹt giữa sân vận động Hàng Đẫy ồn ào và khu di tích Văn Miếu – Quốc Tử Giám nghiêm lặng ...",
      image: "/images/projects/seeson-flagship/3.png",
      href: "/projects/seeson-hanoi-irl-flagship-store",
      backgroundImage: "/images/projects/seeson-flagship/2.png",
      featured: true
    },
    {
      id: 2,
      title: "S502 Apartment",
      slug: "s502-apartment",
      category: "Thiết kế và thi công",
      excerpt: "Khách hàng của chúng tôi yêu thích cảm giác gần gũi yêu thương của mình đối với gia đình và đặc biệt là với con trai nhỏ của cô ấy ...",
      image: "/images/projects/s502/2.png",
      href: "/projects/s502-apartment",
      backgroundImage: "/images/projects/s502/1.png",
      featured: false
    },
    {
      id: 3,
      title: "A3003 Apartment",
      slug: "a3003-apartment",
      category: "Thiết kế và thi công",
      excerpt: "Các vật liệu tạo ra bầu không khí thanh bình và yên tĩnh, với dải màu giữa trắng, kem và nâu. Căn bếp mở, ánh sáng dịu dàng...",
      image: "/images/projects/a3003/2.png",
      href: "/projects/a3003-apartment",
      backgroundImage: "/images/projects/a3003/1.png",
      featured: false
    },
    {
      id: 4,
      title: "B1208 Apartment",
      slug: "b1208-apartment",
      category: "Thiết kế và thi công",
      excerpt: "Ngay vị trí trung tâm Hà Nội, chúng tôi cải tạo một căn hộ với góc nhìn bao trọn cầu Long Biên ...",
      image: "/images/projects/B.1208/4.png",
      href: "/projects/b1208-apartment",
      backgroundImage: "/images/projects/B.1208/1.png",
      featured: false
    },
    {
      id: 5,
      title: "Seeson Saigon Pop-Up Store",
      slug: "seeson-popup",
      category: "Thiết kế và thi công",
      excerpt: "Đây là không gian trưng bày sản phẩm của thương hiệu kính Seeson tại Việt Nam. ...",
      image: "/images/projects/seeson-popup/1.png",
      href: "/projects/seeson-popup",
      backgroundImage: "/images/projects/seeson-popup/1.png",
      featured: false
    },
  ]
};


export const projectsData: Record<string, ProjectDetail> = {
  "seeson-hanoi-irl-flagship-store": {
    id: "seeson-hanoi-irl-flagship-store",
    title: "Hanoi IRL Flagship Store",
    slug: "seeson-hanoi-irl-flagship-store",
    category: "Thiết kế & Thi công",
    year: "2023",
    shortDescription: "Thiết kế và thi công không gian retail hiện đại",
    location: "Hà Nội",
    backgroundImage: "/images/projects/seeson-flagship/4.png",
    fullDescription: `Công trình được cải tạo từ một căn nhà xây dựng quãng thập niên 80 của thế kỉ trước, nằm ngay giao lộ ở quận Đống Đa, kẹt giữa sân vận động Hàng Đẫy ồn ào và khu di tích Văn Miếu – Quốc Tử Giám nghiêm lặng. Bối cảnh xung quanh gồm nhiều cửa hàng bán đồ điện máy, kim khí và hàng quán trà đá vỉa hè – vốn là nét cũ quen thuộc của Hà Nội.
      Khoảng sân trong là điểm chung mà tôi và chủ đầu tư tìm thấy nhau khi trao đổi về việc hợp tác cải tạo công trình này. Nét xưa cũ và những điều giản dị hiện có của căn nhà đã ảnh hưởng tới việc hình thành ý niệm dành cho không gian thương mại, tôi thấy đó là sự lặng lẽ tồn tại song song với những điều muôn màu xung quanh.
      Vật liệu và chất liệu sử dụng cho công trình chủ yếu gom về từ các địa phương xung quanh, hoặc các yếu tố mang tính truyền thống như đá và gỗ tự nhiên. Chúng tôi có sưu tầm các khối đá khác nhau. Cụ Rùa Đá từ Nam Định, những phiến đá phẳng từ Thái Bình, chân cột đá từ những nếp nhà cột ba gian ngày xưa hay những chú chó đá có tuổi đời tương đối lớn. Tất cả vốn là thứ dễ thấy trước đây trong khuôn viên của các ngôi nhà nông thôn Bắc bộ. Đó là cách để nguyên liệu cũ được tiếp tục sống trong một không gian mới.
    `,
    images: [
      { id: 1, src: "/images/projects/seeson-flagship/1.png", alt: "Seeson Flagship - Image 1" },
      { id: 2, src: "/images/projects/seeson-flagship/2.png", alt: "Seeson Flagship - Image 2" },
      { id: 3, src: "/images/projects/seeson-flagship/3.png", alt: "Seeson Flagship - Image 3" },
      { id: 4, src: "/images/projects/seeson-flagship/4.png", alt: "Seeson Flag ship - Image 4" },
      { id: 5, src: "/images/projects/seeson-flagship/5.png", alt: "Seeson Flagship - Image 5" },
      { id: 6, src: "/images/projects/seeson-flagship/6.png", alt: "Seeson Flagship - Image 6" },
      { id: 7, src: "/images/projects/seeson-flagship/7.png", alt: "Seeson Flagship - Image 7" },
      { id: 8, src: "/images/projects/seeson-flagship/8.png", alt: "Seeson Flagship - Image 8" },
      { id: 9, src: "/images/projects/seeson-flagship/9.png", alt: "Seeson Flagship - Image 9" },
      { id: 10, src: "/images/projects/seeson-flagship/10.png", alt: "Seeson Flagship - Image 10" }
    ]
  },
  "s502-apartment": {
    id: "s502-apartment",
    title: "S502 Apartment",
    category: "Thiết kế & Thi công",
    slug: "s502-apartment",
    year: "2022",
    shortDescription: "Căn hộ với không gian mở và vật liệu tự nhiên",
    location: "Hà Nội",
    backgroundImage: "/images/projects/s502/2.png",
    fullDescription: `Khách hàng của chúng tôi yêu thích cảm giác gần gũi yêu thương của mình đối với gia đình và đặc biệt là với con trai nhỏ của cô ấy.
      Ban đầu căn hộ rất ngăn nắp, điều này có nghĩa là không gian bị phân chia rất nhỏ và không phù hợp với nhu cầu sử dụng của gia đình. Bởi vậy việc cải tạo tập trung vào tăng kích thước của các khu vực sinh hoạt chung có thể kết nối với nhau như bếp mở với không gian bàn ăn, không gian phòng khách, cho phép cả ba thành viên trong gia đình tận hưởng các hoạt động khác nhau trong cùng một không gian.  
      Khác với khái niệm “sang trọng” được sử dụng thường xuyên trong thị trường nhà ở hiện nay. Đối với chúng tôi không gian kiến trúc ảnh hưởng rất lớn đến trạng thái cảm xúc của mọi cá nhân bởi vậy sự “sang trọng” của một không gian là tạo sự thoải mái, nghỉ ngơi, tiện nghi, giúp nạp năng lượng và thư giãn. Đôi khi “sang trọng” chỉ là một căn phòng tràn ngập ánh sáng tự nhiên, và có cửa sổ nhìn ra một bầu trời trong xanh.
      Vật liệu được lựa chọn cho dự án cũng hướng đến tạo ra một bầu không khí thanh bình, dịu dàng, ưu tiên sử dụng các vật liệu tự nhiên như gỗ, dầu lau màu thực vật, vải linen, và gạch gốm thủ công Bát Tràng. Đặc biệt chất liệu sơn mài làm thủ công theo lối truyền thống của Việt Nam được ứng dụng trên cánh cửa phòng thờ. Thời gian sẽ tăng thêm vẻ đẹp của chúng.
    `,
    images: [
      { id: 1, src: "/images/projects/s502/1.png", alt: "S502 Apartment - Image 1" },
      { id: 2, src: "/images/projects/s502/2.png", alt: "S502 Apartment - Image 2" },
      { id: 3, src: "/images/projects/s502/3.png", alt: "S502 Apartment - Image 3" },
      { id: 4, src: "/images/projects/s502/4.png", alt: "S502 Apartment - Image 4" },
      { id: 5, src: "/images/projects/s502/5.png", alt: "S502 Apartment - Image 5" },
      { id: 6, src: "/images/projects/s502/6.png", alt: "S502 Apartment - Image 6" },
      { id: 7, src: "/images/projects/s502/7.png", alt: "S502 Apartment - Image 7" },
      { id: 8, src: "/images/projects/s502/8.png", alt: "S502 Apartment - Image 8" },
      { id: 9, src: "/images/projects/s502/9.png", alt: "S502 Apartment - Image 9" },
      { id: 10, src: "/images/projects/s502/10.png", alt: "S502 Apartment - Image 10" },
      { id: 11, src: "/images/projects/s502/11.png", alt: "S502 Apartment - Image 11" }
    ]
  },
  "a3003-apartment": {
    id: "a3003-apartment",
    title: "A3003 Apartment",
    slug: "a3003-apartment",
    category: "Thiết kế & Thi công",
    year: "2021",
    shortDescription: "Căn hộ với sắc và hình của hoài niệm",
    location: "Hà Nội",
    backgroundImage: "/images/projects/a3003/7.png",
    fullDescription: `Chúng tôi hiểu rằng trong mỗi dự án, công việc của chúng tôi chỉ như một hạt cát, đó là cải thiện hoàn cảnh môi trường không gian hiện tại tốt hơn, tiện nghi hơn và điều đó hoàn toàn được truyền cảm hứng từ việc tìm kiếm cái đẹp.
    Đối với dự án căn hộ này, việc cải tạo không hướng đến chỉnh sửa nhiều về mặt chức năng không gian, mà tập trung vào cải thiện tối đa thông gió và cảm quan bớt bó hẹp trong một căn hộ chung cư.  
    Các vật liệu tạo ra bầu không khí thanh bình và yên tĩnh, với dải màu giữa trắng, kem và nâu. Căn bếp mở, ánh sáng dịu dàng làm cho chúng ta chỉ muốn ở nhà, nấu một món ăn ngon và hạnh phúc.
    Trong căn hộ có nhiều chỗ ngồi khác nhau, không phải bày biện cứng nhắc mà sắp đặt tự nhiên thôi. Người ngồi ghế thư giãn với quyển sách, tách trà. Người ngồi bàn cao cạnh bếp nhâm nhi ly vang vẫn trông thấy nhau dịu dàng.
`,
    images: [
      { id: 1, src: "/images/projects/a3003/1.png", alt: "A3003 Apartment - Image 1" },
      { id: 2, src: "/images/projects/a3003/2.png", alt: "A3003 Apartment - Image 2" },
      { id: 3, src: "/images/projects/a3003/3.png", alt: "A3003 Apartment - Image 3" },
      { id: 4, src: "/images/projects/a3003/4.png", alt: "A3003 Apartment - Image 4" },
      { id: 5, src: "/images/projects/a3003/5.png", alt: "A3003 Apartment - Image 5" },
      { id: 6, src: "/images/projects/a3003/6.png", alt: "A3003 Apartment - Image 6" },
      { id: 7, src: "/images/projects/a3003/7.png", alt: "A3003 Apartment - Image 7" },
      { id: 8, src: "/images/projects/a3003/8.png", alt: "A3003 Apartment - Image 8" }
    ]
  },
  "b1208-apartment": {
    id: "b1208-apartment",
    title: "B1208 Apartment",
    slug: "b1208-apartment",
    category: "Thiết kế & Thi công",
    year: "2020",
    shortDescription: "Cải tạo căn hộ với góc nhìn bao trọn cầu Long Biên",
    location: "Hà Nội",
    backgroundImage: "/images/projects/B.1208/1.png",
    fullDescription: `Ngay vị trí trung tâm Hà Nội, chúng tôi cải tạo một căn hộ với góc nhìn bao trọn cầu Long Biên.
    Hình dạng của căn hộ được khai thác một cách khéo léo phá vỡ những phân chia đơn điệu trước đây. Sự phân bố mới tạo ra một không gian liên tục. Trong đó từ bếp tới bàn ăn, phòng khách, khu làm việc chỉ được ngăn cách bởi các yếu tố đồ nội thất và cốt cao độ của sàn nhà.
    Lấy cảm hứng từ người chủ nhà, từ sự di chuyển đến nhiều nơi trên thế giới, và đâu đó là kí ức tuổi trẻ đầy hoài bão mà trở về với những điều giản dị gần gũi. Các vật liệu có nguồn gốc tự nhiên như gỗ, đất, gốm thủ công Bát Tràng được sử dụng trong dự án tạo nên không gian ấm cúng nhưng rộng rãi. Các tông màu nâu, cam, đỏ sẫm chiếm ưu thế trong các không gian, xuyến suốt toàn bộ là bảng màu ấm áp từ tối đến sáng. Tất cả điều này phù hợp với hơi thở giản dị, thô mộc của căn hộ.
    Những tác phẩm nghệ thuật được lựa chọn cẩn thận đặt dưới những thanh xà gỗ gợi lại những kí ức khiến người ta cảm thấy chủ nhà đã ở trong căn hộ này lâu lắm rồi.`,
    images: [
      { id: 1, src: "/images/projects/B.1208/1.png", alt: "B1208 Apartment - Image 1" },
      { id: 2, src: "/images/projects/B.1208/2.png", alt: "B1208 Apartment - Image 2" },
      { id: 3, src: "/images/projects/B.1208/3.png", alt: "B1208 Apartment - Image 3" },
      { id: 4, src: "/images/projects/B.1208/4.png", alt: "B1208 Apartment - Image 4" },
      { id: 5, src: "/images/projects/B.1208/5.png", alt: "B1208 Apartment - Image 5" },
      { id: 6, src: "/images/projects/B.1208/6.png", alt: "B1208 Apartment - Image 6" },
      { id: 7, src: "/images/projects/B.1208/7.png", alt: "B1208 Apartment - Image 7" },
      { id: 8, src: "/images/projects/B.1208/8.png", alt: "B1208 Apartment - Image 8" },
      { id: 9, src: "/images/projects/B.1208/9.png", alt: "B1208 Apartment - Image 9" }
    ]
  },
  "seeson-popup": {
    id: "seeson-popup",
    title: "Seeson Pop-up Store",
    slug: "seeson-popup",
    category: "Thiết kế & Thi công",
    year: "2024",
    shortDescription: "Không gian trưng bày sản phẩm của thương hiệu kính Seeson tại Việt Nam",
    location: "Hồ Chí Minh",
    backgroundImage: "/images/projects/seeson-popup/2.png",
    fullDescription: `Đây là không gian trưng bày sản phẩm của thương hiệu kính Seeson tại Việt Nam. Thông qua công trình này, Tôra Studio muốn thể hiện suy nghĩ của bản thân về sự tự do trong thiết kế, không bị gò bó bởi các quy tắc, tính chất chức năng, điều kiện không gian có sẵn hay những hạn chế về kỹ thuật thi công, vật liệu.
    Lấy ý tưởng từ tính linh hoạt của một quả bóng bay, dễ chiều và dễ xử lý, bóng bay dài chúng ra có thể uốn thành hình như con thỏ, con chó,.. bóng bay tròn lấp đầy các khoảng trống. Nó đủ sức trả lời cho chúng tôi những chỗ cần nở ra những chỗ cần co lại. Nhóm thiết kế muốn tạo nên một không gian mới từ căn phòng triển lãm ban đầu, với chất liệu giấy Dó truyền thống đặc trưng đã đi cùng SEESON từ không gian IRL Flagship Hà Nội.
    Bắt đầu bằng bản vẽ sáp màu, để có thể hiện thực hoá mọi thứ trong điều kiện không gian có sẵn, chúng tôi đã sắp xếp thời gian, công sức, gói ghém từng phần việc của mình, bố trí địa điểm và cách sử dụng nguyên vật liệu làm sao cho phù hợp với những nguồn lực mà mình có. Tất cả tạo nên một không gian cho tất cả mọi người và ở đó có kính SEESON, chúng tôi mong muốn mỗi khách hàng khi tới đây sẽ có những “quãng nghỉ” của riêng mình.`,
    images: [
      { id: 1, src: "/images/projects/seeson-popup/1.png", alt: "Seeson Pop-up Store - Image 1" },
      { id: 2, src: "/images/projects/seeson-popup/2.png", alt: "Seeson Pop-up Store - Image 2" },
      { id: 3, src: "/images/projects/seeson-popup/3.png", alt: "Seeson Pop-up Store - Image 3" },
      { id: 4, src: "/images/projects/seeson-popup/4.png", alt: "Seeson Pop-up Store - Image 4" },
      { id: 5, src: "/images/projects/seeson-popup/5.png", alt: "Seeson Pop-up Store - Image 5" },
      { id: 6, src: "/images/projects/seeson-popup/6.png", alt: "Seeson Pop-up Store - Image 6" },
      { id: 7, src: "/images/projects/seeson-popup/7.png", alt: "Seeson Pop-up Store - Image 7" },
      { id: 8, src: "/images/projects/seeson-popup/8.png", alt: "Seeson Pop-up Store - Image 8" }
    ]
  }

  // Add more projects...
};
