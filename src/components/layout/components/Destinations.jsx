import BASE_URL from "@/Urls/baseUrl";
import { useState, useEffect, useRef } from "react";

const buttonData = [
  "Europe",
  "Asia",
  "North America",
  "South America",
  "Africa",
  "Oceania",
  "Polar",
  "Regions",
];

const tabContent = [
  {
    heading: "Europe",
    tours: [
      [
        { id: 1, name: "Italy Tours", href: "#" },
        { id: 2, name: "Spain Tours", href: "#" },
        { id: 3, name: "France Tours", href: "#" },
        { id: 4, name: "Portugal Tours", href: "#" },
        { id: 5, name: "Turkey Tours", href: "#" },
        { id: 6, name: "Albania Tours", href: "#" },
        { id: 7, name: "Andorra Tours", href: "#" },
        { id: 8, name: "Armenia Tours", href: "#" },
        { id: 9, name: "Austria Tours", href: "#" },
        { id: 10, name: "Lithuania Tours", href: "#" },
      ],
      [
        { id: 11, name: "Azerbaijan Tours", href: "#" },
        { id: 12, name: "Belgium Tours", href: "#" },
        { id: 13, name: "Bosnia Herzegovina Tours", href: "#" },
        { id: 14, name: "Bulgaria Tours", href: "#" },
        { id: 15, name: "Croatia Tours", href: "#" },
        { id: 16, name: "Cyprus Tours", href: "#" },
        { id: 17, name: "Iceland Tours", href: "#" },
        { id: 18, name: "Ireland Tours", href: "#" },
        { id: 19, name: "Kosovo Tours", href: "#" },
        { id: 20, name: "Latvia Tours", href: "#" },
      ],
      [
        { id: 21, name: "Czech Republic Tours", href: "#" },
        { id: 22, name: "Denmark Tours", href: "#" },
        { id: 23, name: "England Tours", href: "#" },
        { id: 24, name: "Estonia Tours", href: "#" },
        { id: 25, name: "Finland Tours", href: "#" },
        { id: 26, name: "Georgia Tours", href: "#" },
        { id: 27, name: "Germany Tours", href: "#" },
        { id: 28, name: "Greece Tours", href: "#" },
        { id: 29, name: "Holland Tours", href: "#" },
        { id: 30, name: "Hungary Tours", href: "#" },
      ],
    ],
  },
  {
    heading: "Asia",
    tours: [
      [
        { id: 1, name: "Italy Tours", href: "#" },
        { id: 2, name: "Spain Tours", href: "#" },
        { id: 3, name: "France Tours", href: "#" },
        { id: 4, name: "Portugal Tours", href: "#" },
        { id: 5, name: "Turkey Tours", href: "#" },
        { id: 6, name: "Albania Tours", href: "#" },
        { id: 7, name: "Andorra Tours", href: "#" },
        { id: 8, name: "Armenia Tours", href: "#" },
        { id: 9, name: "Austria Tours", href: "#" },
        { id: 10, name: "Lithuania Tours", href: "#" },
      ],
      [
        { id: 11, name: "Azerbaijan Tours", href: "#" },
        { id: 12, name: "Belgium Tours", href: "#" },
        { id: 13, name: "Bosnia Herzegovina Tours", href: "#" },
        { id: 14, name: "Bulgaria Tours", href: "#" },
        { id: 15, name: "Croatia Tours", href: "#" },
        { id: 16, name: "Cyprus Tours", href: "#" },
        { id: 17, name: "Iceland Tours", href: "#" },
        { id: 18, name: "Ireland Tours", href: "#" },
        { id: 19, name: "Kosovo Tours", href: "#" },
        { id: 20, name: "Latvia Tours", href: "#" },
      ],
      [
        { id: 21, name: "Czech Republic Tours", href: "#" },
        { id: 22, name: "Denmark Tours", href: "#" },
        { id: 23, name: "England Tours", href: "#" },
        { id: 24, name: "Estonia Tours", href: "#" },
        { id: 25, name: "Finland Tours", href: "#" },
        { id: 26, name: "Georgia Tours", href: "#" },
        { id: 27, name: "Germany Tours", href: "#" },
        { id: 28, name: "Greece Tours", href: "#" },
        { id: 29, name: "Holland Tours", href: "#" },
        { id: 30, name: "Hungary Tours", href: "#" },
      ],
    ],
  },
  {
    heading: "North America",
    tours: [
      [
        { id: 1, name: "Italy Tours", href: "#" },
        { id: 2, name: "Spain Tours", href: "#" },
        { id: 3, name: "France Tours", href: "#" },
        { id: 4, name: "Portugal Tours", href: "#" },
        { id: 5, name: "Turkey Tours", href: "#" },
        { id: 6, name: "Albania Tours", href: "#" },
        { id: 7, name: "Andorra Tours", href: "#" },
        { id: 8, name: "Armenia Tours", href: "#" },
        { id: 9, name: "Austria Tours", href: "#" },
        { id: 10, name: "Lithuania Tours", href: "#" },
      ],
      [
        { id: 11, name: "Azerbaijan Tours", href: "#" },
        { id: 12, name: "Belgium Tours", href: "#" },
        { id: 13, name: "Bosnia Herzegovina Tours", href: "#" },
        { id: 14, name: "Bulgaria Tours", href: "#" },
        { id: 15, name: "Croatia Tours", href: "#" },
        { id: 16, name: "Cyprus Tours", href: "#" },
        { id: 17, name: "Iceland Tours", href: "#" },
        { id: 18, name: "Ireland Tours", href: "#" },
        { id: 19, name: "Kosovo Tours", href: "#" },
        { id: 20, name: "Latvia Tours", href: "#" },
      ],
      [
        { id: 21, name: "Czech Republic Tours", href: "#" },
        { id: 22, name: "Denmark Tours", href: "#" },
        { id: 23, name: "England Tours", href: "#" },
        { id: 24, name: "Estonia Tours", href: "#" },
        { id: 25, name: "Finland Tours", href: "#" },
        { id: 26, name: "Georgia Tours", href: "#" },
        { id: 27, name: "Germany Tours", href: "#" },
        { id: 28, name: "Greece Tours", href: "#" },
        { id: 29, name: "Holland Tours", href: "#" },
        { id: 30, name: "Hungary Tours", href: "#" },
      ],
    ],
  },
  {
    heading: "South America",
    tours: [
      [
        { id: 1, name: "Italy Tours", href: "#" },
        { id: 2, name: "Spain Tours", href: "#" },
        { id: 3, name: "France Tours", href: "#" },
        { id: 4, name: "Portugal Tours", href: "#" },
        { id: 5, name: "Turkey Tours", href: "#" },
        { id: 6, name: "Albania Tours", href: "#" },
        { id: 7, name: "Andorra Tours", href: "#" },
        { id: 8, name: "Armenia Tours", href: "#" },
        { id: 9, name: "Austria Tours", href: "#" },
        { id: 10, name: "Lithuania Tours", href: "#" },
      ],
      [
        { id: 11, name: "Azerbaijan Tours", href: "#" },
        { id: 12, name: "Belgium Tours", href: "#" },
        { id: 13, name: "Bosnia Herzegovina Tours", href: "#" },
        { id: 14, name: "Bulgaria Tours", href: "#" },
        { id: 15, name: "Croatia Tours", href: "#" },
        { id: 16, name: "Cyprus Tours", href: "#" },
        { id: 17, name: "Iceland Tours", href: "#" },
        { id: 18, name: "Ireland Tours", href: "#" },
        { id: 19, name: "Kosovo Tours", href: "#" },
        { id: 20, name: "Latvia Tours", href: "#" },
      ],
      [
        { id: 21, name: "Czech Republic Tours", href: "#" },
        { id: 22, name: "Denmark Tours", href: "#" },
        { id: 23, name: "England Tours", href: "#" },
        { id: 24, name: "Estonia Tours", href: "#" },
        { id: 25, name: "Finland Tours", href: "#" },
        { id: 26, name: "Georgia Tours", href: "#" },
        { id: 27, name: "Germany Tours", href: "#" },
        { id: 28, name: "Greece Tours", href: "#" },
        { id: 29, name: "Holland Tours", href: "#" },
        { id: 30, name: "Hungary Tours", href: "#" },
      ],
    ],
  },
  {
    heading: "Africa",
    tours: [
      [
        { id: 1, name: "Italy Tours", href: "#" },
        { id: 2, name: "Spain Tours", href: "#" },
        { id: 3, name: "France Tours", href: "#" },
        { id: 4, name: "Portugal Tours", href: "#" },
        { id: 5, name: "Turkey Tours", href: "#" },
        { id: 6, name: "Albania Tours", href: "#" },
        { id: 7, name: "Andorra Tours", href: "#" },
        { id: 8, name: "Armenia Tours", href: "#" },
        { id: 9, name: "Austria Tours", href: "#" },
        { id: 10, name: "Lithuania Tours", href: "#" },
      ],
      [
        { id: 11, name: "Azerbaijan Tours", href: "#" },
        { id: 12, name: "Belgium Tours", href: "#" },
        { id: 13, name: "Bosnia Herzegovina Tours", href: "#" },
        { id: 14, name: "Bulgaria Tours", href: "#" },
        { id: 15, name: "Croatia Tours", href: "#" },
        { id: 16, name: "Cyprus Tours", href: "#" },
        { id: 17, name: "Iceland Tours", href: "#" },
        { id: 18, name: "Ireland Tours", href: "#" },
        { id: 19, name: "Kosovo Tours", href: "#" },
        { id: 20, name: "Latvia Tours", href: "#" },
      ],
      [
        { id: 21, name: "Czech Republic Tours", href: "#" },
        { id: 22, name: "Denmark Tours", href: "#" },
        { id: 23, name: "England Tours", href: "#" },
        { id: 24, name: "Estonia Tours", href: "#" },
        { id: 25, name: "Finland Tours", href: "#" },
        { id: 26, name: "Georgia Tours", href: "#" },
        { id: 27, name: "Germany Tours", href: "#" },
        { id: 28, name: "Greece Tours", href: "#" },
        { id: 29, name: "Holland Tours", href: "#" },
        { id: 30, name: "Hungary Tours", href: "#" },
      ],
    ],
  },
  {
    heading: "Oceania",
    tours: [
      [
        { id: 1, name: "Italy Tours", href: "#" },
        { id: 2, name: "Spain Tours", href: "#" },
        { id: 3, name: "France Tours", href: "#" },
        { id: 4, name: "Portugal Tours", href: "#" },
        { id: 5, name: "Turkey Tours", href: "#" },
        { id: 6, name: "Albania Tours", href: "#" },
        { id: 7, name: "Andorra Tours", href: "#" },
        { id: 8, name: "Armenia Tours", href: "#" },
        { id: 9, name: "Austria Tours", href: "#" },
        { id: 10, name: "Lithuania Tours", href: "#" },
      ],
      [
        { id: 11, name: "Azerbaijan Tours", href: "#" },
        { id: 12, name: "Belgium Tours", href: "#" },
        { id: 13, name: "Bosnia Herzegovina Tours", href: "#" },
        { id: 14, name: "Bulgaria Tours", href: "#" },
        { id: 15, name: "Croatia Tours", href: "#" },
        { id: 16, name: "Cyprus Tours", href: "#" },
        { id: 17, name: "Iceland Tours", href: "#" },
        { id: 18, name: "Ireland Tours", href: "#" },
        { id: 19, name: "Kosovo Tours", href: "#" },
        { id: 20, name: "Latvia Tours", href: "#" },
      ],
      [
        { id: 21, name: "Czech Republic Tours", href: "#" },
        { id: 22, name: "Denmark Tours", href: "#" },
        { id: 23, name: "England Tours", href: "#" },
        { id: 24, name: "Estonia Tours", href: "#" },
        { id: 25, name: "Finland Tours", href: "#" },
        { id: 26, name: "Georgia Tours", href: "#" },
        { id: 27, name: "Germany Tours", href: "#" },
        { id: 28, name: "Greece Tours", href: "#" },
        { id: 29, name: "Holland Tours", href: "#" },
        { id: 30, name: "Hungary Tours", href: "#" },
      ],
    ],
  },
  {
    heading: "Polar",
    tours: [
      [
        { id: 1, name: "Italy Tours", href: "#" },
        { id: 2, name: "Spain Tours", href: "#" },
        { id: 3, name: "France Tours", href: "#" },
        { id: 4, name: "Portugal Tours", href: "#" },
        { id: 5, name: "Turkey Tours", href: "#" },
        { id: 6, name: "Albania Tours", href: "#" },
        { id: 7, name: "Andorra Tours", href: "#" },
        { id: 8, name: "Armenia Tours", href: "#" },
        { id: 9, name: "Austria Tours", href: "#" },
        { id: 10, name: "Lithuania Tours", href: "#" },
      ],
      [
        { id: 11, name: "Azerbaijan Tours", href: "#" },
        { id: 12, name: "Belgium Tours", href: "#" },
        { id: 13, name: "Bosnia Herzegovina Tours", href: "#" },
        { id: 14, name: "Bulgaria Tours", href: "#" },
        { id: 15, name: "Croatia Tours", href: "#" },
        { id: 16, name: "Cyprus Tours", href: "#" },
        { id: 17, name: "Iceland Tours", href: "#" },
        { id: 18, name: "Ireland Tours", href: "#" },
        { id: 19, name: "Kosovo Tours", href: "#" },
        { id: 20, name: "Latvia Tours", href: "#" },
      ],
      [
        { id: 21, name: "Czech Republic Tours", href: "#" },
        { id: 22, name: "Denmark Tours", href: "#" },
        { id: 23, name: "England Tours", href: "#" },
        { id: 24, name: "Estonia Tours", href: "#" },
        { id: 25, name: "Finland Tours", href: "#" },
        { id: 26, name: "Georgia Tours", href: "#" },
        { id: 27, name: "Germany Tours", href: "#" },
        { id: 28, name: "Greece Tours", href: "#" },
        { id: 29, name: "Holland Tours", href: "#" },
        { id: 30, name: "Hungary Tours", href: "#" },
      ],
    ],
  },
  {
    heading: "Regions",
    tours: [
      [
        { id: 1, name: "Italy Tours", href: "#" },
        { id: 2, name: "Spain Tours", href: "#" },
        { id: 3, name: "France Tours", href: "#" },
        { id: 4, name: "Portugal Tours", href: "#" },
        { id: 5, name: "Turkey Tours", href: "#" },
        { id: 6, name: "Albania Tours", href: "#" },
        { id: 7, name: "Andorra Tours", href: "#" },
        { id: 8, name: "Armenia Tours", href: "#" },
        { id: 9, name: "Austria Tours", href: "#" },
        { id: 10, name: "Lithuania Tours", href: "#" },
      ],
      [
        { id: 11, name: "Azerbaijan Tours", href: "#" },
        { id: 12, name: "Belgium Tours", href: "#" },
        { id: 13, name: "Bosnia Herzegovina Tours", href: "#" },
        { id: 14, name: "Bulgaria Tours", href: "#" },
        { id: 15, name: "Croatia Tours", href: "#" },
        { id: 16, name: "Cyprus Tours", href: "#" },
        { id: 17, name: "Iceland Tours", href: "#" },
        { id: 18, name: "Ireland Tours", href: "#" },
        { id: 19, name: "Kosovo Tours", href: "#" },
        { id: 20, name: "Latvia Tours", href: "#" },
      ],
      [
        { id: 21, name: "Czech Republic Tours", href: "#" },
        { id: 22, name: "Denmark Tours", href: "#" },
        { id: 23, name: "England Tours", href: "#" },
        { id: 24, name: "Estonia Tours", href: "#" },
        { id: 25, name: "Finland Tours", href: "#" },
        { id: 26, name: "Georgia Tours", href: "#" },
        { id: 27, name: "Germany Tours", href: "#" },
        { id: 28, name: "Greece Tours", href: "#" },
        { id: 29, name: "Holland Tours", href: "#" },
        { id: 30, name: "Hungary Tours", href: "#" },
      ],
    ],
  },
];

export default function Destinations() {
  const [currentdestinationTab, setCurrentdestinationTab] = useState("Europe");
  const [currentdd, setCurrentdd] = useState("");
  const [productData, setProductData]=useState([])
  const [product, setProduct]=useState([])
  const [filteredProducts, setFilteredProducts]=useState([])
  const [filteredCity, setFilteredCity]=useState([])
  const dropDownContainer = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setCurrentdd("");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  useEffect(() => {
    fetch(`${BASE_URL}/product`)
      .then(res => res.json())
      .then(data => {
        // Ensure data is an array
        if (Array.isArray(data)) {
          setProduct(data)
          // Create a Set to store unique country names
          const uniqueCountries = new Set();
          data.forEach(item => uniqueCountries.add(item.country));
  
          // Convert Set back to an array if necessary
          const countries = [...uniqueCountries];
  
          setProductData(countries); // or do whatever you want with countries
        }
      })
      .catch(err => console.error('Error fetching tours:', err));
  }, []);
   
  const handleButtonClick =(elm)=>{
    const filtered = product.filter(product => product.country === elm);
    setFilteredProducts(filtered);
    // const filterCity = filtered.city.map((city=>{
    //   setFilteredCity(filterCity)
    // }))
    const filteredCities = filtered.map(product => product.city);
  // Flatten the array of arrays to get a single array of cities
  const allCities = filteredCities.flat();
  // Remove duplicates (if any)
  const uniqueCities = [...new Set(allCities)];
  setFilteredCity(uniqueCities);

  }
  // console.log("filteredCity",filteredCity)
  console.log(filteredProducts)

  

  return (
    <div
      ref={dropDownContainer}
      className="headerDropdown lg:d-none js-form-dd"
    >
      <div
        className="headerDropdown__button "
        onClick={() =>
          setCurrentdd((pre) => (pre == "destination" ? "" : "destination"))
        }
      >
        Destinations
        <i className="icon-chevron-down text-18"></i>
      </div>

      <div
        className={`headerDropdown__content ${
          currentdd == "destination" ? "is-active" : ""
        } `}
      >
        <div className="tabsMenu">
          <div className="tabsMenu__container">
            <div className="tabs js-tabs">
              <div className="tabsMenu__tabs">
                <div className="tabs__controls js-tabs-controls">
                  {productData&&productData.map((elm, i) => (
                    <button
                      onClick={() => handleButtonClick(elm)}
                      key={i}
                      className={`tabs__button js-tabs-button ${
                        currentdestinationTab == elm ? "is-tab-el-active" : ""
                      } `}
                      data-tab-target=".-tab-item-1"
                    >
                      {elm}
                    </button>
                  ))}
                </div>
              </div>

              <div className="tabsMenu__content">
                <div className="tabs__content js-tabs-content">
                  <div className="tabs__pane -tab-item-1 is-tab-el-active">
                    <div className="tabsMenu__lists">                     
                            <div className="tabsMenu-list__content">
                            {Array.from(new Set(filteredProducts.map(product => product.country))).map((country, index) => (
    <h5 key={index}>{country} Travel Guide</h5>
  ))}
                              {filteredCity.map((elm, i) => (
                                <div key={i} className="tabsMenu-list__item">
                                  <a href={elm.href}>{elm}</a>
                                </div>
                              ))}
                            </div>
                          {/* </div> */}
                        
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
