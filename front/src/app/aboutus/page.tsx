"use client";
const AboutUs = () => {
  return (
    <div>
      <section className="text-gray-600 body-font my-16">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Nuestro Equipo
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              En Fast Burger, creemos firmemente que la tecnología puede
              simplificar la vida de las personas. Nuestro equipo está compuesto
              por expertos apasionados en tecnología y e-commerce, dedicados a
              ofrecer una experiencia de compra excepcional. Desde
              desarrolladores de software hasta diseñadores de UX y
              especialistas en atención al cliente, cada miembro de nuestro
              equipo juega un papel crucial en la creación de soluciones
              innovadoras que satisfacen y superan las necesidades y deseos de
              nuestros clientes. Nos comprometemos no solo con la excelencia de
              los productos que ofrecemos, sino también con la forma en que los
              entregamos, asegurando que cada interacción con nuestro sitio sea
              intuitiva, segura y satisfactoria.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="/patricio.png"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Patricio Calatayud
                  </h2>
                  <p className="text-gray-500">Frontend Developer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="gabriel.jpeg"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Gabriel Lazo
                  </h2>
                  <p className="text-gray-500">Frontend Developer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="gustavo.jpeg"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Gustavo Quispe
                  </h2>
                  <p className="text-gray-500">Frontend Developer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="renzo.jpeg"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Renzo Alvarado
                  </h2>
                  <p className="text-gray-500">Backend Developer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="paolo.jpeg"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Omar Aliaga
                  </h2>
                  <p className="text-gray-500">Backend Developer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="robert.jpeg"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Roberto Balcázar
                  </h2>
                  <p className="text-gray-500">Backend Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
