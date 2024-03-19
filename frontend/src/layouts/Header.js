import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { listProducts } from "../services/products/product";
import { DOMAIN } from "../utils/settings/config";
import { logoutUser } from "../services/API/authApi";
import Transition from "../utils/transition";
import { TiShoppingCart } from "react-icons/ti";
import { useUser } from "../components/Context/Context";


export default function Header({ align }) {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [hasToken, setHasToken] = useState(false);
  const [totalcart, setTotalCart] = useState();
  const { user } = useUser();
  useEffect(() => {
    // Kiểm tra xem key 'token' có tồn tại trong localStorage không
    const storedToken = localStorage.getItem("token");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setTotalCart(cart.length);
    setHasToken(!!storedToken); // Chuyển đổi thành giá trị boolean
    // Nếu bạn muốn cập nhật hasToken khi key 'token' thay đổi, bạn có thể sử dụng sự kiện storage
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setHasToken(!!updatedToken);
    };
    window.addEventListener("storage", handleStorageChange);
    // Cleanup để tránh memory leak
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  console.log("cart", totalcart)
  const fetchProducts = async (value) => {
    try {
      const productsData = await listProducts();
      // console.log(productsData);
      setProducts(productsData);
      const results = productsData.filter((product) => {
        return (
          value &&
          product &&
          product.name &&
          product.name.toLowerCase().includes(value)
        );
      });
      setResult(results);
      // console.log('result',results);
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.log(error);
    }
  };

  console.log(products);
  const handleChange = (value) => {
    setInput(value);
    fetchProducts(value);
  };
  const resetValue = () => {
    setInput("");
    setResult("");
  };
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  const handleLogout = async () => {
    try {
      await logoutUser();
      // Chuyển hướng về trang đăng nhập hoặc trang chính (tùy thuộc vào yêu cầu của bạn)
      window.location.reload();
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  return (
    <header className=" top-0 left-0 right-0 z-1 ">
      <nav
        className=" box-border max-w-[100%] mx-auto duration-400 relative overflow-hidden"
        style={{ background: "#007E41" }}
      >
        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-0 w-6 h-6 rounded-full group-hover:scale-150  duration-700 right-[98%] top-2 bg-[#57e871]"></div>
        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-0 w-3 h-3 rounded-full group-hover:scale-150  duration-700 right-[78%] top-1 bg-[#f5f5f0]"></div>
        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-0 w-6 h-6 rounded-full group-hover:scale-150  duration-700 right-[74%] top-2 bg-[#f93e3e]"></div>
        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-0 w-16 h-16 rounded-full group-hover:scale-150  duration-700 right-[70%] top-9 bg-[#fbf848]"></div>
        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-0 w-14 h-14 rounded-full group-hover:scale-150  duration-700 right-2/4 -top-6 bg-[#2f234f]"></div>
        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-0 w-12 h-12 rounded-full group-hover:scale-150  duration-700 right-1/4 top-6 bg-[#f3bf8e]"></div>
        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-0 w-10 h-10 rounded-full group-hover:scale-150  duration-700 right-52 top-12 bg-[#000a66]"></div>
        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-0 w-6 h-6 rounded-full group-hover:scale-150  duration-700 right-2 top-2 bg-[#60d756]"></div>

        <div className=" flex flex-wrap py-2 items-center justify-between max-w-screen-2xl px-1 mx-auto">
          <a href="/" className="flex items-center h-90px] w-[200px] ">
            <img
              src="/image/LOGO_SP.png"
              // width="100px"
              // height='150px'
              className=" mr-3 w-full h-full"
              alt="SalePhone Logo"
            />
          </a>
          <div className="flex items-center lg:order-2">
            <div className="hidden sm:inline-block ">

              <div className="relative">
                <input
                  type="text"
                  style={{ background: "#FFFFFF" }}
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                  className="border placeholder-black text-lg rounded-full
                   border-white p-4 w-[500px] py-2 pl-8 pr-4 outline-none focus:shadow-outline focus:border-transparent "
                  placeholder="Tìm kiếm sản phẩm"
                />
                <div className="  absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0,0,256,256">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="butt" stroke-linejoin="none" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><path transform="scale(5.12,5.12)" d="M38,20c0,3.87891 -1.32031,7.42188 -3.5,10.28125l12.125,12.09375l-4.25,4.25l-12.28125,-12.28125c-2.63281,1.67188 -5.73828,2.65625 -9.09375,2.65625c-9.39844,0 -17,-7.60156 -17,-17c0,-9.39844 7.60156,-17 17,-17c9.39844,0 17,7.60156 17,17z" id="strokeMainSVG" fill="#d9ffdd" stroke="#d9ffdd" stroke-width="3" stroke-linejoin="round"></path><g transform="scale(5.12,5.12)" fill="#232825" stroke="none" stroke-width="1" stroke-linejoin="miter"><path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z"></path></g></g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center lg:order-2">

            <button className="border text-white h-12 w-48 duration-300 relative group cursor-pointer overflow-hidden p-4 rounded-lg bg-[#d099d0] font-extrabold hover:bg-amber-200">
              <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-700 right-12 top-12 bg-yellow-500"></div>
              <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150  duration-700 right-20 -top-6 bg-orange-500"></div>
              <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8 rounded-full group-hover:scale-150  duration-700 right-32 top-6 bg-pink-500"></div>
              <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4 rounded-full group-hover:scale-150  duration-700 right-2 top-12 bg-red-600"></div>
              <p className="z-10 absolute bottom-2 text-center"><a
                href="/checkOrder"
              >
                Kiểm tra đơn hàng
              </a></p>
            </button>
            {
              user && <p>Welcome, {user.username}</p>
            }

            <NavLink className="relative" to="/cart">
              {
                totalcart !== 0 && (
                  <div className="absolute z-50 bg-[#22bd39] right-[-3px] top-[-10px] border rounded-full w-7 h-7 text-center text-[#2b1010]">
                    {totalcart}
                  </div>
                )
              }
              <button
                className="bg-[#ffffff] px-4 py-3 mx-3 h-12 border border-white text-black
                 relative overflow-hidden z-30 group hover:bg-[#e93f3f] transition-all duration-500 rounded-lg tracking-wider font-semibold">
                <TiShoppingCart className="w-8 h-8" />

                <svg
                  class="absolute inset-0 left-0 top-0 fill-sky-300 -z-30 opacity-0 group-hover:opacity-100 group-hover:duration-300 group-hover:transition-all group-active:fill-sky-950"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 204.000000 113.000000"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.0"
                >
                  <g
                    stroke="none"
                    transform="translate(0.000000,113.000000) scale(0.100000,-0.100000)"
                  >
                    <path
                      d="M850 1069 c-23 -48 -27 -66 -19 -85 5 -14 9 -40 9 -57 0 -18 4 -38 9
            -46 9 -14 19 36 19 99 1 44 7 71 17 78 9 6 35 56 35 67 0 3 -9 5 -20 5 -15 0 -28 -16 -50 -61z"
                    ></path>
                    <path
                      d="M1662 1099 c-24 -17 -40 -34 -38 -37 3 -3 14 2 24 11 10 10 22 17 25 17 4 0 16 9 27 20 30 30 9 24 -38 -11z"
                    ></path>
                    <path
                      d="M101 1104 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z"
                    ></path>
                    <path
                      d="M1090 1070 c0 -6 7 -10 15 -10 8 0 15 2 15 4 0 2 -7 6 -15 10 -8 3 -15 1 -15 -4z"
                    ></path>
                    <path
                      d="M1 1023 c1 -53 6 -49 11 10 2 20 0 37 -4 37 -4 0 -8 -21 -7 -47z"
                    ></path>
                    <path
                      d="M1121 1024 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z"
                    ></path>
                    <path
                      d="M101 984 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z"
                    ></path>
                    <path
                      d="M1140 958 c0 -9 5 -20 10 -23 13 -8 13 5 0 25 -8 13 -10 13 -10 -2z"
                    ></path>
                    <path
                      d="M1286 955 c4 -8 8 -15 10 -15 2 0 4 7 4 15 0 8 -4 15 -10 15 -5 0 -7 -7 -4 -15z"
                    ></path>
                    <path
                      d="M1647 930 c-13 -15 -14 -20 -3 -20 7 0 16 9 19 20 3 11 4 20 3 20 -1 0 -9 -9 -19 -20z"
                    ></path>
                    <path
                      d="M1171 925 c1 -19 18 -51 18 -35 0 8 -4 22 -9 30 -5 8 -9 11 -9 5z"
                    ></path>
                    <path
                      d="M8 875 c6 -11 22 -33 36 -49 27 -30 33 -60 16 -71 -6 -4 -19 -24 -30 -45 l-20 -39 43 -32 c23 -18 43 -34 45 -34 1 -1 4 -60 7 -131 4 -121 6 -130 30 -153 19 -20 25 -22 25 -9 0 8 -7 21 -15 28 -14 12 -15 23 -14 177 1 8 -13
              116 -66 129 -29 7 -35 44 -10 64 8 7 15 19 15 27 0 7 6 16 14 19 27 10 -11 78 -68 124 -18 14 -18 14 -8 -5z"
                    ></path>
                    <path
                      d="M862 830 c-12 -27 -26 -52 -31 -54 -5 -3 -2 -26 7 -51 14 -44 14 -46 -13 -85 -22 -32 -27 -47 -22 -77 11 -63 29 -65 21 -2 -6 52 -5 58 21 82 26 24 27 27 17 69 -9 34 -8 47 3 65 16 25 36 103 26 103 -3 0 -16 -22 -29 -50z"
                    ></path>
                    <path
                      d="M1200 872 c0 -16 67 -89 74 -81 3 3 -12 25 -34 49 -22 24 -40 38 -40 32z"
                    ></path>
                    <path
                      d="M1567 826 c-4 -10 -1 -13 8 -9 8 3 12 9 9 14 -7 12 -11 11 -17 -5z"
                    ></path>
                    <path
                      d="M1536 773 c-6 -14 -5 -15 5 -6 7 7 10 15 7 18 -3 3 -9 -2 -12 -12z"
                    ></path>
                    <path
                      d="M1270 770 c0 -5 7 -10 15 -10 8 0 15 -7 15 -15 0 -8 4 -15 9 -15 5 0 11 -10 14 -22 4 -12 9 -19 12 -16 14 13 -9 60 -36 74 -17 8 -29 10 -29 4z"
                    ></path>
                    <path
                      d="M1344 672 c-19 -12 -29 -109 -24 -236 5 -142 18 -135 17 9 -2 156 2 188 26 216 17 19 4 27 -19 11z"
                    ></path>
                    <path
                      d="M1398 673 c6 -2 18 -2 25 0 6 3 1 5 -13 5 -14 0 -19 -2 -12 -5z"
                    ></path>
                    <path
                      d="M1463 673 c9 -2 25 -2 35 0 9 3 1 5 -18 5 -19 0 -27 -2 -17 -5z"
                    ></path>
                    <path
                      d="M848 433 c2 -36 5 -63 7 -61 1 2 6 28 9 59 5 42 4 58 -6 61 -10 4 -12 -9 -10 -59z"
                    ></path>
                    <path
                      d="M1698 403 c6 -2 18 -2 25 0 6 3 1 5 -13 5 -14 0 -19 -2 -12 -5z"
                    ></path>
                    <path
                      d="M872 345 c0 -16 2 -22 5 -12 2 9 2 23 0 30 -3 6 -5 -1 -5 -18z"
                    ></path>
                    <path
                      d="M1810 345 c0 -10 40 -45 53 -45 6 0 8 1 6 3 -2 1 -16 13 -31 26 -16 14 -28 21 -28 16z"
                    ></path>
                  </g>
                </svg>

              </button>

            </NavLink>



            {hasToken && (
              <div className="mr-3 relative inline-flex">
                <button
                  ref={trigger}
                  className="inline-flex justify-center items-center group"
                  aria-haspopup="true"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
                    width="32"
                    height="32"
                    alt="User"
                  />
                  <div className="flex items-center truncate">
                    <svg
                      className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </button>

                <Transition
                  className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === "right" ? "right-0" : "left-0"
                    }`}
                  show={dropdownOpen}
                  enter="transition ease-out duration-200 transform"
                  enterStart="opacity-0 -translate-y-2"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-out duration-200"
                  leaveStart="opacity-100"
                  leaveEnd="opacity-0"
                >
                  <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                  >
                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
                      <p className="font-medium text-slate-800  dark:text-slate-100">
                        Quản lý
                      </p>
                      <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                        Administrator
                      </div>
                    </div>
                    <ul>
                      <li>
                        <Link
                          className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
                          to="/admin"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          Truy cập quản lý
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
                          onClick={() => handleLogout()}
                        >
                          Đăng xuất
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Transition>
              </div>
            )}


            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className="relative ">
        <div className=" absolute top-10 left-1/2 transform -translate-x-1/2 bg-white z-50 grid grid-cols-2 rounded-lg w-[50%] mx-auto mt-1 shadow-lg">
          {result &&
            result.map((items) => (
              <div>
                {items.product_detail.map((item, id) => (
                  <div className="px-3 py-1 hover:bg-gray-200 flex items-center">
                    <NavLink
                      onClick={resetValue}
                      to={`/product_detail/${items.id}`}
                    >
                      <div className="w-[60px] h-[60px pr-1">
                        <img
                          className="w-full h-full"
                          src={`${DOMAIN}${item.image}`}
                          alt=""
                        />
                      </div>
                    </NavLink>
                    <div>
                      <a
                        href={`/product_detail/${items.id}`}
                        className="text-[14px]"
                      >
                        {items.name} {items.capacity} - Chính hãng VN/A
                      </a>
                      <div>
                        <span className="text-[12px] text-red-500 font-medium">
                          {formatPrice(`${item.price} ₫`)}
                        </span>
                        <span className="text-[11px] text-gray-500 line-through">
                          {formatPrice(`${item.discount} ₫`)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

    </header>
  );
}
