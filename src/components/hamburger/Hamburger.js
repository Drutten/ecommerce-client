import './Hamburger.css';


const Hamburger = (props) => {
  
  const setClassName = () => {
    const isOpenClass = props.isOpen ? 'open' : 'notOpen';
    return isOpenClass;
  }

  
    return(
        <div>
        <div className={`hamburger ${setClassName()}`} onClick={props.onToggleHamburger}>
        <div></div>
        <div></div>
        <div></div>
        </div>
        
        </div>
        
    );
  
}
export default Hamburger;