import '../css/wallipi.css';
import { Link } from 'react-router-dom';

const wallipis = (props) => {
    const { wallipi } = props;
    return (
      <>
        <div className="card">
          <img src={wallipi.webformatURL} alt='img' className='top-0 left-0 object-cover h-full' />
        </div>
      </>
    )
}

export default wallipis;
