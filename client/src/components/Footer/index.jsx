import Ah from '../../assets/images/ah.jpg'
import Pn from '../../assets/images/pn.jpg'


const index = () => {
  return (
    <div className=' absolute  w-full left-0 right-0 flex flex-col items-center bg-black mt-[15vh] p-[3vh] px-[9vh]'>
      <h1 className='text-[3.5vh] text-gray-200 border-b-2 pb-3 w-fit' >In honor of:</h1>
      <div className="flex  md:flex-row flex-col md:gap-x-10 gap-y-5 md:p-10 p-3 gap- w-full  text-white text-center  h-full">
        <div className='md:w-[50%] w-full flex flex-col  items-center gap-[2vh]'>
          <div className="w-[13vh] h-[13vh] rounded-full overflow-hidden border-2 border-white">
            <img className="w-full h-auto" src={Ah} alt="" />
          </div>
          <h3 className='text-[2vh] text-gray-200'>
            Prof. Dr. Ahmed Salama, Dept. of Mathematics and Computer Sciences, Faculty of Sciences, Port Said, Egypt,
          </h3>
          <h2 className='text-[2vh] text-gray-200'>
            Email: <a className='text-secondary' href="mailto:ahmed_salama_2000@sci.psu.edu.eg">ahmed_salama_2000@sci.psu.edu.eg.</a>
          </h2>
        </div>

        <div className='md:w-[50%] w-full flex flex-col  items-center gap-[2vh]'>
          <div className="w-[13vh] h-[13vh] rounded-full overflow-hidden border-2 border-white">
            <img className="w-full h-auto" src={Pn} alt="" />
          </div>
          <h3 className='text-[2vh] text-gray-200'>
            Prof. Dr Florentin Smarandache, PhD, Postdoc, Mathematics, Physical and Natural Sciences Division, University of New Mexico, Gallup Campus, NM 87301, USA,
          </h3>
          <h2 className='text-[2vh] text-gray-200'>
            Email: <a className='text-secondary' href="mailto:smarand@unm.edu">smarand@unm.edu</a>
          </h2>
        </div>
      </div>
    </div>

  )
}

export default index