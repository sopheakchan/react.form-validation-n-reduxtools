import React from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";

const About = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Username",
      selector: (row) => row.lastName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
  ];

  async function fetchData() {
    const data = await fetch("https://dummyjson.com/users");
    const res = await data.json();
    setFilteredData(res.users)
    setData(res.users);
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!search) {
      setFilteredData(data); 
      return;
    }
    
    const result = data.filter((item) => {
      // Assuming 'username' is the correct property; adjust as necessary
      return item.lastName.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredData(result);
  }, [search, data]);
  

  return (
    <>
      <section className="bg-gray-100">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                About Us
              </h2>
              <p className="mt-4 text-gray-600 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                quis eros at lacus feugiat hendrerit sed ut tortor. Suspendisse
                et magna quis elit efficitur consequat. Mauris eleifend velit a
                pretium iaculis. Donec sagittis velit et magna euismod, vel
                aliquet nulla malesuada. Nunc pharetra massa lectus, a fermentum
                arcu volutpat vel.
              </p>
              <div className="mt-8">
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Learn more about us
                  <span className="ml-2">&#8594;</span>
                </a>
              </div>
            </div>
            <div className="mt-12 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
                alt="About Us Image"
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        <div>
          <DataTable
            columns={columns}
            fixedHeader={true}
            fixedHeaderScrollHeight="500px"
            data={filteredData}
            subHeader
            subHeaderComponent={
              <input
              onChange={(e) => setSearch(e.target.value)}
                className="rounded-md border border-gray-500"
                placeholder="Search data"
                type="text"
              ></input>
            }
          />
        </div>
      </section>
    </>
  );
};

export default About;
