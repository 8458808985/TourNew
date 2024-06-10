import { useEffect, useState } from "react";
// import HeaderSerch from "../components/HeaderSerch";
import Destinations from "../components/Destinations";
import Activities from "../components/Activities";
import Currency from "../components/Currency";
import MobileMenu from "../components/MobileMenu";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { searchUser } from "../Redux/feature/Searchslice";
import { setExchangeRates, setSelectedCurrency } from '../Redux/feature/exchangeSlice';


export default function 
Header1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data , setData]=useState('')
  const [userName, setUserName] = useState("");
  useEffect(()=>{
    const localdata=localStorage.getItem("role")
    setData(localdata)
  })

  const logoutData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role")
    setLoggedIn(false);
    navigate('/');
  }


  const pageNavigate = (pageName) => {
    navigate(pageName);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [addClass, setAddClass] = useState(false);

  // Add a class to the element when scrolled 50px

  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setAddClass(true);
    } else {
      setAddClass(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

// Search functionality
const [searchdata, setSearchData] = useState("");
const [recentSearches, setRecentSearches] = useState([]);
const [showRecentSearches, setShowRecentSearches] = useState(false);

useEffect(() => {
  const savedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  setRecentSearches(savedSearches);
}, []);

const handleSearchSubmit = (e) => {
  e.preventDefault();
  const updatedRecentSearches = [searchdata, ...recentSearches.filter(search => search !== searchdata)];
  setRecentSearches(updatedRecentSearches);
  localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));
  dispatch(searchUser(searchdata));
  navigate("/tour-list-1");
};

const handleSearchChange = (e) => {
  setSearchData(e.target.value);
};

const handleRecentSearchClick = (search) => {
  setSearchData(search);
  dispatch(searchUser(search));
  navigate("/tour-list-1");
};

const handleSearchFocus = () => {
  setShowRecentSearches(true);
};

const handleSearchBlur = () => {
  setTimeout(() => setShowRecentSearches(false), 200); // Timeout to allow click event to register
};

useEffect(() => {
  const userData = localStorage.getItem("userName");
  setUserName(userData);
  }, []);


  //currency api

  const [exchangeRatess, setExchangeRatess] = useState({});
  const [selectedCurrencys, setSelectedCurrencys] = useState('INR');
  const [currencies, setCurrencies] = useState([]);

  

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/INR')
      .then(response => response.json())
      .then(data => {
        setCurrencies([data.base, ...Object.keys(data.rates)]);
        dispatch(setExchangeRates(data.rates));
        setExchangeRatess(data.rates);
      });
  }, []);

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setSelectedCurrency(selectedCurrency);
    dispatch(setSelectedCurrency(selectedCurrency));
    setSelectedCurrencys(selectedCurrency);
  };

  return (
    <>
      <header
        className={`header -type-1 js-header ${addClass ? "-is-sticky" : ""}`}
      >
        <div className="header__container container-fluid">
          <div className="headerMobile__left">
            {/* <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn js-menu-button"
            >
              <i className="icon-main-menu"></i>
            </button> */}
          </div>

          <div className="header__logo">
            <Link to="/" className="header__logo">
              <img src="/img/Logo/renomadic-color-logo.png" style={{width:"120px"}} alt="logo icon" />
            </Link>
            <div className="xl:d-none ml-30 position-relative">
          
            <form className="d-flex" style={{marginLeft:"4rem"}} onSubmit={handleSearchSubmit}>
            <div style={{position:"relative"}}>
              <div class="input-group">
                <span class="input-group-text bg-transparent border-0 me-1" id="basic-addon1">
                <i class="icon-search text-18 " style={{position:"absolute", left:"10px", top:"50%", transform:" translateY(-50%)"}}></i>
                </span>
                <input
                  style={{ width:"300px", }}
                    class="form-control me-2 b"
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    value={searchdata}
                    type="search"
                    placeholder="Search destinations or activities"
                    aria-label="Search"
                  />
              </div>
              </div>

              </form>
              {showRecentSearches && (
                <ul className="recent-searches-list position-absolute list-group mt-2 w-100 " style={{marginLeft:"90px"}}>
                  {recentSearches
                    .filter(search => search.toLowerCase().includes(searchdata.toLowerCase()))
                    .map((search, index) => (
                      <li
                        key={index}
                        className="list-group-item list-group-item-action"
                        onMouseDown={() => handleRecentSearchClick(search)}
                      >
                        {search}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          <div className="headerMobile__right">
            {/* <button
              onClick={() => pageNavigate("/tour-list-1")}
              className="d-flex"
            > */}

<form className="d-flex " onSubmit={handleSearchSubmit} style={{marginLeft:"10px"}}>
<span class="input-group-text bg-transparent border-0 " id="basic-addon1">

              <i className="icon-search text-18"></i>
              </span>
              <input 
              
              class="form-control "
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              value={searchdata}
              type="search"
              placeholder="Search Destination"
              aria-label="Search"
              
              />
            {/* </button> */}
            </form>
            {showRecentSearches && (
                <ul className="recent-searches-list position-absolute list-group mt-30  " style={{marginLeft:"70px", width:"35%"}}>
                  {recentSearches
                    .filter(search => search.toLowerCase().includes(searchdata.toLowerCase()))
                    .map((search, index) => (
                      <li
                        key={index}
                        className="list-group-item list-group-item-action"
                        onMouseDown={() => handleRecentSearchClick(search)}
                      >
                        {search}
                      </li>
                    ))}
                </ul>
              )}

            <button
              onClick={() => pageNavigate("/login")}
              className="d-flex ml-20 mt-2"
            >
              <i className="icon-person text-18 "></i>
            </button>
          </div>

          <div className="header__right">
            <Destinations />
        {/* Currency */}

            <select value={selectedCurrencys} onChange={handleCurrencyChange}>
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>

            {data === "admin" ? (
              
  <>

    <Link to="/db-main" className="button -sm -dark-1 bg-accent-1 rounded-200 text-white ml-30">
      Dashboard
    </Link>


  </>
) : (
  <>
{data === 'user'?
(
  <>
     <Dropdown>
      <Dropdown.Toggle className="ml-30 button -sm -dark-1 bg-accent-1 rounded-200 text-white" id="dropdown-basic">
        Hy &nbsp;&nbsp;{userName}
      </Dropdown.Toggle>
      <Dropdown.Menu className="bg-danger">
       <Link className="btn btn-danger w-100 fw-bold" type="btn" onClick={logoutData}>Logout</Link> 
      </Dropdown.Menu>
    </Dropdown>
 

   </>
    
):(
<>
  <Link to="/register" className="ml-10">
      Sign up
    </Link>
    <Link to="/login" className="button -sm -dark-1 bg-accent-1 rounded-200 text-white ml-30">
      Log in
    </Link>
    </>
)
}


  
  </>
)}


            {/* <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn ml-30 js-menu-button"
            >
              <i className="icon-main-menu"></i>
            </button> */}
          </div>
        </div>
      </header>
      <MobileMenu
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />
    </>
  );
}
