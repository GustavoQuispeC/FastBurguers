"use client";

import { IoSearchSharp } from "react-icons/io5";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import { IUser } from "@/interfaces/IUser";
import Swal from "sweetalert2";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const UserRol = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const USERS_PER_PAGE = 10; // Cantidad de usuarios por página
  const [loading, setLoading] = useState(true);

  //! Obtener token de usuario
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        console.log("userToken", parsedSession.userData.token);
        setToken(parsedSession.userData.token);
      }
    }
  }, [router]);

  //! Obtener los usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiURL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const users = response.data;
        console.log("Users:", users);
        setUsers(users);
        setTotalPages(Math.ceil(users.length / USERS_PER_PAGE));
      } catch (error: any) {
        console.error("Error fetching users:", error);
        if (error.response && error.response.status === 401) {
          // Manejar el error 401 de forma específica
          Swal.fire(
            "¡Error!",
            "No autorizado. Por favor, inicia sesión nuevamente.",
            "error"
          );
        } else {
          Swal.fire(
            "¡Error!",
            "Ha ocurrido un error al obtener los usuarios.",
            "error"
          );
        }
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  //! Función para calcular los usuarios a mostrar en la página actual
  const getCurrentPageUsers = () => {
    const filteredUsers = filterUsers();
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  };

  //! Función para filtrar los usuarios
  const filterUsers = () => {
    if (searchTerm === "") {
      return users; // Si el campo de búsqueda está vacío, mostrar todos los usuarios
    } else {
      return users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  //! Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Actualizar el estado del término de búsqueda
    setCurrentPage(1); // Reiniciar la página actual al cambiar el término de búsqueda
  };

  const onPageChange = (page: number) => setCurrentPage(page);

  //! Función para manejar el cambio de rol
  const handleRoleChange = async (id: string, isAdmin: boolean) => {
    try {
      const response = await axios.put(
        `${apiURL}/users/${id}`,
        { isAdmin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Rol de usuario actualizado:", response.data);
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, isAdmin } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire(
        "¡Error!",
        "Ha ocurrido un error al actualizar el rol del usuario",
        "error"
      );
    }
  };

  //! Función para habilitar un usuario
  const handleEnableUser = async (id: string) => {
    if (!token) {
      Swal.fire(
        "¡Error!",
        "Token no encontrado. Por favor, inicia sesión.",
        "error"
      );
      return;
    }

    try {
      const response = await axios.put(
        `${apiURL}/users/${id}`,
        { condition: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Usuario habilitado:", response.data);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, condition: true } : user
        )
      );
    } catch (error) {
      console.error("Error enabling user:", error);
      Swal.fire(
        "¡Error!",
        "Ha ocurrido un error al habilitar el usuario",
        "error"
      );
    }
  };

  //! Función para manejar la deshabilitación de un usuario
  const handleDisableUser = async (id: string) => {
    if (!token) {
      Swal.fire(
        "¡Error!",
        "Token no encontrado. Por favor, inicia sesión.",
        "error"
      );
      return;
    }

    try {
      const response = await axios.put(
        `${apiURL}/users/${id}`,
        { condition: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Usuario deshabilitado:", response.data);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, condition: false } : user
        )
      );
    } catch (error) {
      console.error("Error disabling user:", error);
      Swal.fire(
        "¡Error!",
        "Ha ocurrido un error al deshabilitar el usuario",
        "error"
      );
    }
  };

  //! Spinner de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (users.length === 0) {
    return (
      <div className="h-screen items-center justify-center">
        {loading ? <Spinner /> : <p>Algo no está bien.</p>}
      </div>
    );
  }

  return (
    <section className="p-3 sm:p-5 antialiased h-screen dark:bg-gray-700">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12 ">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 bg-gray-900">
            <div className="flex-1 flex items-center space-x-2">
              <h5>
                <span className="text-orange-400">Listado de usuarios</span>
              </h5>
            </div>
            <div className="flex-shrink-0 flex flex-col items-start md:flex-row md:items-center lg:justify-end space-y-3 md:space-y-0 md:space-x-3"></div>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Buscar
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IoSearchSharp />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    placeholder="Buscar usuario..."
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <div className="flex items-center space-x-3 w-full md:w-auto">
                {/* Botones adicionales si es necesario */}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    Datos completos
                  </th>
                  <th scope="col" className="p-4">
                    correo
                  </th>
                  <th scope="col" className="p-4">
                    Rol
                  </th>
                  <th scope="col" className="p-4">
                    Habilitar
                  </th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageUsers().map((user: IUser) => (
                  <tr
                    key={user.id}
                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="flex items-center">{user.name}</div>
                    </th>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">{user.email}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          id={`user-${user.id}`}
                          name={`role-${user.id}`}
                          value="user"
                          checked={user.isAdmin === false}
                          onChange={() => handleRoleChange(user.id, false)}
                        />
                        <label htmlFor={`user-${user.id}`}>User</label>
                        <input
                          type="radio"
                          id={`admin-${user.id}`}
                          name={`role-${user.id}`}
                          value="admin"
                          checked={user.isAdmin === true}
                          onChange={() => handleRoleChange(user.id, true)}
                        />
                        <label htmlFor={`admin-${user.id}`}>Admin</label>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center justify-center space-x-4">
                        <input
                          type="checkbox"
                          checked={user.condition}
                          onChange={() =>
                            user.condition
                              ? handleDisableUser(user.id)
                              : handleEnableUser(user.id)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex overflow-x-auto sm:justify-center py-5 bg-gray-900">
            <Pagination
              layout="pagination"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              previousLabel="Anterior"
              nextLabel="Siguiente"
              showIcons
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRol;
