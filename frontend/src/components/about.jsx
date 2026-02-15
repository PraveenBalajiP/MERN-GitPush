import Header from "./header";

function About({theme,setTheme}){
    return(
        <div className="about">
            <Header theme={theme} setTheme={setTheme} />

        </div>
    );
}

export default About