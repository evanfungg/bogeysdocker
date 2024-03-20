import Link from "next/link"
import "./style.css"



export default function Home() {
  return ( 
    <main className="main">
      <div className="container">
        <div className="content">
          <div className="image-container">
            <img src="/14_Golf.jpg" alt="Golf Image" />
          </div>
          <div className="title-container">
            <h2 className="title">18 Bogeys</h2>
          </div>
          <div className="buttons">
            <div>
              <button className="sign-in"><a href="/api/auth/signup">Sign In</a></button>
            </div>
           
          </div>
        </div>
      </div>
    </main>
  );
}

