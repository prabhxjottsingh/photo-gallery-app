import '../css/Footer.css'

const Footer = () => {
  return (
      <>
        <div className='footer-hero mt-4'>
            <div className='footer-logo'>
                <img style={{height:280}} src='/images/logo.jpg' alt='logo' />
            </div>
            <div className='footer-content'>
                <h2 className='text-neutral-500'>
                    Wallipi is a photography community developed to provide platform for the professional photographers to share skills.
                    It has been created in REACT and API has been used in it.<br></br><br></br>
                    Special Thanks to : &nbsp;
                    <b><a className='text-sm' href='https://pixabay.com/'>pixabay</a></b>
                    <br></br><br></br>
                    &copy; <b className='text-sm'>Prabhjot Singh, 2023</b>
                </h2>
            </div>
            <div className='footer-links'>
                <div className='footer-links-panel'>
                    <a target="_blank" href="mailto: prabhx.jott@gmail.com"><button className='footer-mail flex items-center justify-center'><i class="fas fa-envelope text-black"></i></button></a>
                    <a target="_blank" href="https://github.com/prabhxjottsingh"><button className='footer-git flex items-center justify-center ml-5'><i class="fab fa-github text-black"></i></button></a>
                </div>
            </div>
        </div>
      </>
  )
};

export default Footer;
