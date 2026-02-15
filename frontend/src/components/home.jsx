import Header from "./header";

function Home({theme,setTheme}){
    return(
        <div className="home">
            <Header theme={theme} setTheme={setTheme} />
                
        </div>
    );
}

export default Home