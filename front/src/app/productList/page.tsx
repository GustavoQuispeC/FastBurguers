"use client";
import { MdEdit } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiAddLargeFill } from "react-icons/ri";
import { Pagination } from "flowbite-react";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const onPageChange = (page: number) => setCurrentPage(page);

  const deleteProduct = () => {
    console.log("delete product");
  };
  return (
    <>
      <section className=" p-3 sm:p-5 antialiased h-screen">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-900 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 bg-gray-900">
              <div className="flex-1 flex items-center space-x-2">
                <h5>
                  <span className="text-orange-400">Listado de Productos</span>
                </h5>
              </div>
              <div className="flex-shrink-0 flex flex-col items-start md:flex-row md:items-center lg:justify-end space-y-3 md:space-y-0 md:space-x-3"></div>
            </div>
            <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <IoSearchSharp />
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      placeholder="Search for products"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </form>
              </div>

              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <Link
                    type="button"
                    id="createProductButton"
                    data-modal-toggle="createProductModal"
                    className="flex items-center justify-center text-white bg-orange-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    href="/productAdd"
                  >
                    <RiAddLargeFill />
                    Agregar Producto
                  </Link>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      Producto
                    </th>
                    <th scope="col" className="p-4">
                      Categoria
                    </th>
                    <th scope="col" className="p-4">
                      Stock
                    </th>
                    <th scope="col" className="p-4">
                      Precio
                    </th>
                    <th scope="col" className="p-4">
                      Descuento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="flex items-center mr-3">
                        <img
                          src="/hamburguesa2.jpg"
                          alt=""
                          className="h-8 w-auto mr-3"
                        />
                        Hamburguesa 1
                      </div>
                    </th>
                    <td className="px-4 py-3">
                      <span className="bg-gray-900 text-orange-400 text-xs font-medium px-2 py-0.5 rounded">
                        Clásica
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex justify-center items-center">30</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      $39.00
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      $1.47
                    </td>

                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center space-x-4">
                        <Link
                          type="button"
                          data-drawer-target="drawer-update-product"
                          data-drawer-show="drawer-update-product"
                          aria-controls="drawer-update-product"
                          className="py-2 px-3 flex items-center text-sm font-medium text-center text-orange-400 bg-gray-900 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          href="/productEdit"
                        >
                          <MdEdit />
                          Editar
                        </Link>

                        <button
                          onClick={() => setOpenModal(true)}
                          type="button"
                          data-modal-target="delete-modal"
                          data-modal-toggle="delete-modal"
                          className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                          <RiDeleteBin6Fill />
                          Eliminar
                        </button>
                        <Modal
                          show={openModal}
                          size="md"
                          onClose={() => setOpenModal(false)}
                          popup
                         
                        >
                          <Modal.Header />
                          <Modal.Body>
                            <div className="text-center">
                              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-">
                                Are you sure you want to delete this product?
                              </h3>
                              <div className="flex justify-center gap-4">
                                <Button
                                  color="failure"
                                  onClick={() => setOpenModal(false)}
                                >
                                  {"Yes, I'm sure"}
                                </Button>
                                <Button
                                  color="gray"
                                  onClick={() => setOpenModal(false)}
                                >
                                  No, cancel
                                </Button>
                              </div>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="flex items-center mr-3">
                        <img
                          src="/hamburguesa1.png"
                          alt=""
                          className="h-8 w-auto mr-3"
                        />
                        Hamburguesa 2
                      </div>
                    </th>
                    <td className="px-4 py-3">
                      <span className="bg-gray-900 text-orange-400 text-xs font-medium px-2 py-0.5 rounded">
                        Clásica
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex justify-center items-center">95</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      $30.00
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      $1.47
                    </td>

                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center space-x-4">
                        <Link
                          type="button"
                          data-drawer-target="drawer-update-product"
                          data-drawer-show="drawer-update-product"
                          aria-controls="drawer-update-product"
                          className="py-2 px-3 flex items-center text-sm font-medium text-center text-orange-400 bg-gray-900 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          href="/productEdit"
                        >
                          <MdEdit />
                          Editar
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            deleteProduct();
                          }}
                          data-modal-target="delete-modal"
                          data-modal-toggle="delete-modal"
                          className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                          <RiDeleteBin6Fill />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex overflow-x-auto sm:justify-center py-5 bg-gray-900">
              <Pagination
                layout="pagination"
                currentPage={currentPage}
                totalPages={100}
                onPageChange={onPageChange}
                previousLabel="Anterior"
                nextLabel="Siguiente"
                showIcons
              />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End block --> */}
    </>
  );
};

export default ProductList;
