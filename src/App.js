import React, {useState, useEffect, useRef} from 'react'
import Card from './components/Card'
import Search from './components/Search';
import Cart from './components/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faMagnifyingGlass,faCartShopping} from '@fortawesome/free-solid-svg-icons'
import './App.scss';

export function getPokemon({ url }) {
  return new Promise((resolve, reject) => {
      fetch(url).then(res => res.json())
          .then(data => {
              resolve(data)
          })
  });
}

export async function getAllPokemon(url) {
  return new Promise((resolve, reject) => {
      fetch(url).then(res => res.json())
          .then(data => {
              resolve(data)
          })
  });
}
function App() {
  const [pokeData, setPokemonData] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showHome, setShowHome] = useState(true)
  const [cart, setCart] = useState([]); 
  //const [price,setPrice] = useState(0);
  const PokePrice = 100;
  const url = 'https://pokeapi.co/api/v2/pokemon'
  useEffect(() => {
      async function fetchData() {
        let response = await getAllPokemon(url)
        await loadPokemon(response.results);
      }
      fetchData();
  }, [])
  
  const loadPokemon = async (data) => {
    let poke_Data = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(poke_Data);
    //console.log(poke_Data)
    //console.log("PokeData")
  }

  const show_Search = event =>{
    setShowSearch(current => !current);
    setShowCart(false);
    setShowHome(false);
    //console.log(showSearch)
  }
  const show_Cart = event =>{
    setShowCart(current => !current);
    setShowSearch(false);
    setShowHome(false);
    //console.log(showCart)
  }
  const show_Home = event =>{
    setShowHome(current => !current);
    setShowSearch(false);
    setShowCart(false);
    //console.log(showCart)
  }
 
  const handleClick = (pokemon) => {      
      const AddtoCart = cart.filter((cart)=>cart.id !== pokemon.id);
      setCart([...AddtoCart, pokemon]);
      //let addPrice = price + PokePrice;
      //setPrice(addPrice);
      //console.log(price)
      //const btn = document.getElementById(pokemon.id)
      //btn.style.display='none'
      //btn.innerHTML="Out of Stock"
  };
  //console.log(cart)
  const handleClickSearch = (poke__Data) => {
    const AddtoCart = cart.filter((cart)=>cart.id !== poke__Data.id);
    setCart([...AddtoCart, poke__Data]);
    //const addPrice = price + PokePrice;
    //setPrice(addPrice);
};
  return (
    <>
      <div className='nav-bar'>
        <nav>
            <a href="#" class="nav-links"  exact="true" activeclassname="active" id="home-link" onClick={show_Home}>
                <FontAwesomeIcon icon={faHome} color="#4d4d4e"/>
            </a>
            <a href="#" class="nav-links"  exact="true" activeclassname="active" id="search-link" onClick={show_Search}>
                <FontAwesomeIcon icon={faMagnifyingGlass} color="#4d4d4e"/>
            </a>
            <a  href="#" class="nav-links"  exact="true" activeclassname="active" id="cart-link" onClick={show_Cart}>
                <FontAwesomeIcon icon={faCartShopping} color="#4d4d4e"/>
            </a>

        </nav>
    </div>
    {showHome && <section class="container home-page">
            <div class="banner">
                <h1>Poke Shop</h1>
            </div>
            <h1 class="title">FEATURED POKEMON</h1>
             <div className="featured-pokemon">
              {pokeData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} handleClick={handleClick}/>
              })}
            </div>
    </section>}
    {showSearch && <Search handleClickSearch={handleClickSearch}/>}
    {showCart &&  <Cart cart={cart} setCart={setCart} PokePrice={PokePrice}/>}

  </>
  )
}

export default App;
