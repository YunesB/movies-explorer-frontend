import Header from '../Header/Header';
import About from '../About/About';
import Technologies from '../Technologies/Technologies';
import Student from '../Student/Student';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="page">
      <div className="content">
        <Header />
        <About />
        <Technologies />
        <Student />
        <Footer />
      </div>
    </div>
  );
}

export default App;
