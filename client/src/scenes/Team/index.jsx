import Waves from './Assets/Waves.jsx'
import Logo from './Assets/logo.png'
import Mo from './Assets/MM.jpg'
import Def from './Assets/d.jpg'
const index = () => {
  return (
    <div className="w-full">
      <div className="relative shadow-md md:p-0 py-[15vh] md:h-[40vh] flex justify-center items-center">
        <Waves />
        <div className='flex flex-col md:flex-row px-5 gap-[3vh]'>
          <h1 className="text-[2vh]  flex justify-center items-center font-semibold">
            This website was developed through the collaborative efforts of students from the Computer Science Department within the Faculty of Science at Port Said University, under the guidance of Professor Dr. Ahmad Salama.
          </h1>
          <div className='w-full md:w-[50%] flex items-center justify-center'>
            <div className='w-[20vh] rounded-full overflow-hidden border-green-400 border-2'>
              <img src={Logo} alt='logo' />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap">
        <div className="shadow-sm gap-[2vh] flex flex-col justify-center items-center w-full md:w-1/3 h-[40vh]">
          <div className='rounded-full overflow-hidden border-blue-400 border-2'>
            <img className='w-[23vh] h-[23vh]' src={Mo} alt='logo' />
          </div>
          <h2 className='text-[2vh] font-semibold'>Mohamed Magdy</h2>
          <p className='text-[1.5vh]'>Team Lead / Full-Stack Engineer</p>
        </div>
        <div className="shadow-sm gap-[2vh] flex flex-col justify-center items-center w-full md:w-1/3 h-[40vh]">
          <div className='rounded-full overflow-hidden border-blue-400 border-2'>
            <img className='w-[23vh] h-[23vh]' src={Def} alt='logo' />
          </div>
          <h2 className='text-[2vh] font-semibold'>Mohamed Osama</h2>
          <p className='text-[1.5vh]'></p>
        </div>
        <div className="shadow-sm gap-[2vh] flex flex-col justify-center items-center w-full md:w-1/3 h-[40vh]">
          <div className='rounded-full overflow-hidden border-blue-400 border-2'>
            <img className='w-[23vh] h-[23vh]' src={Def} alt='logo' />
          </div>
          <h2 className='text-[2vh] font-semibold'>Ahmad Tarik</h2>
          <p className='text-[1.5vh]'></p>
        </div>
        <div className="shadow-sm gap-[2vh] flex flex-col justify-center items-center w-full md:w-1/3 h-[40vh]">
          <div className='rounded-full overflow-hidden border-blue-400 border-2'>
            <img className='w-[23vh] h-[23vh]' src={Def} alt='logo' />
          </div>
          <h2 className='text-[2vh] font-semibold'>Gehad</h2>
          <p className='text-[1.5vh]'></p>
        </div>
        <div className="shadow-sm gap-[2vh] flex flex-col justify-center items-center w-full md:w-1/3 h-[40vh]">
          <div className='rounded-full overflow-hidden border-blue-400 border-2'>
            <img className='w-[23vh] h-[23vh]' src={Def} alt='logo' />
          </div>
          <h2 className='text-[2vh] font-semibold'>Nora Seyam</h2>
          <p className='text-[1.5vh]'></p>
        </div>
        <div className="shadow-sm gap-[2vh] flex flex-col justify-center items-center w-full md:w-1/3 h-[40vh]">
          <div className='rounded-full overflow-hidden border-blue-400 border-2'>
            <img className='w-[23vh] h-[23vh]' src={Def} alt='logo' />
          </div>
          <h2 className='text-[2vh] font-semibold'>Nada</h2>
          <p className='text-[1.5vh]'></p>
        </div>

      </div>
    </div>
  )
}

export default index