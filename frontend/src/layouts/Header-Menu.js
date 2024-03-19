import React, { useEffect, useState } from 'react'
import { listCategories } from '../services/categories/categories';

export default function HeaderMenu() {
  const [categories, setcategories] = useState([0]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await listCategories();
        setcategories(categoriesData);
      } catch (error) {
        // Xử lý lỗi nếu cần
      }
    };
    fetchCategories();
  }, [reload]);
  return (
    <div className='bg-slate-500'>
      <div
        className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
        id="mobile-menu-2"
      >
        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-6 lg:mt-0 text-white">
          <li className="relative">
            <a
              href="/listproducts"
              className="relative block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-yellow-200 lg:p-0"
            >
              <div className="flex items-center">
                <p>Danh mục </p>
                <svg
                  width="17px"
                  height="17px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                      fill="#eeeeee"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            </a>
            <ul className="w-auto absolute bg-white shadow-2xl text-black z-50 hidden dropdown-category  py-1 rounded-md mt-1">
              {categories.map((item, index) => (
                <li className="block py-1  pl-2 pr-20 hover:bg-gray-200">
                  <a href={`listproducts/${item.id}`} className="">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <a
              href="/listproducts"
              className="block py-2 pl-3 pr-4  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-yellow-200 lg:p-0  "
            >
              Tất cả sản phẩm
            </a>
          </li>
          <li>
            <a
              href="news"
              className="block py-2 pl-3 pr-4  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-yellow-200 lg:p-0 "
            >
              Tin tức
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="block py-2 pl-3 pr-4  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-yellow-200 lg:p-0 "
            >
              Liên hệ
            </a>
          </li>
        </ul>
      </div>

    </div>
  )
}
