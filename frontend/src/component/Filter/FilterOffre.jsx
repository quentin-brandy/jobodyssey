import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Typography from '@mui/material/Typography';

const marks = [
    {
      value: 0,
      label: '0 €',
    },
    {
      value: 100000,
      label: '1000000 €',
    },
  ];


const CustomSlider = styled(Slider)(({ theme }) => ({
    color: '#3587F2',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        backgroundColor: '#00000',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'bold',
        top: -6,
        backgroundColor: 'unset',
        color: theme.palette.text.primary,
        '&::before': {
          display: 'none',
        },
    },
}));

export default function FilterOffre({rémunération , value , contrat , télétravail} ) {
    const [filter, setFilter] = useState(false);
   

const handlefilter = () => {

        setFilter(!filter);
}



    return (
        <>
        <div className='flex flex-col   md:relative pb-20 md:pb-0 md:mb-10 md:w-80'>
        <img className='md:w-60 hidden mt-5 md:mt-10 md:block ' src="/researchimage.png" alt="" />
        <div className={`z-40 absolute  md:h-auto md:relative flex w-full justify-evenly md:justify-normal bg-white rounded-tr-xl rounded-br-xl items-center gap-4 pl-5 pr-1 ${filter ? "-translate-x-[90%]  transition-transform duration-500" : "-translate-x-[0%] transition-transform duration-500"} md:translate-x-[0%] md:pl-0 md:w-32 md:bg-transparent  md:mt-20`}>
        <div className='flex  flex-col h-full bg-white md:bg-none md:h-auto md:border-2 md:border-black md:pt-4'>
            <img className=' md:h30 md:hidden' src="/researchimage.png" alt="" />
            <div className='flex flex-col items-center md:justify-center md:gap-10  gap-8 pb-5 md:pb-0 md:w-48 lg:w-64'>
                <h2 className='flex flex-col text-2xl font-semibold items-center gap-10'>Filtres</h2>
                <div className='flex flex-col px-2 md:items-center items-center gap-10'>
                    <h3 className='text-lg font-semibold' >Rémunération <span className='text-regular'>(par an)</span></h3>
                    <Box className="w-[15rem] md:w-[7rem] lg:w-[10rem]" >
                        <CustomSlider
                            value={value}
                            min={0}
                            max={100000}
                            onChange={rémunération}
                            onChangeCommitted={rémunération}
                            valueLabelDisplay="on"
                            marks={marks}
                            aria-labelledby="range-slider"
                        />
                    </Box>
                </div>
                <div className='flex flex-col w-auto gap-5 lg:items-start items-center'>
                    <h2 className='text-lg font-semibold lg:pl-5'>Type de contrat :</h2>
                    <div className='flex flex-wrap justify-center gap-5'>
                        <div className='flex justify-center items-center gap-1'>
                            <input className='appearance-none w-3 h-3 border-2 rounded-sm border-black checked:bg-button' type="checkbox" id="CDI" name="CDI" value="CDI" onClick={contrat} />
                            <label htmlFor="CDI">CDI</label>
                        </div>
                        <div className='flex justify-center items-center gap-1'>
                            <input className='appearance-none w-3 h-3 border-2 rounded-sm border-black checked:bg-button' type="checkbox" id="CDD" name="CDD" value="CDD" onClick={contrat}/>
                            <label htmlFor="CDD">CDD</label>
                        </div>
                        <div className='flex justify-center items-center gap-1'>
                            <input className='appearance-none w-3 h-3 border-2 rounded-sm border-black checked:bg-button'  type="checkbox" id="Stage" name="Stage" value="Stage" onClick={contrat}/>
                            <label htmlFor="Stage">Stage</label>
                        </div>
                        <div className='flex justify-center items-center gap-1'>
                            <input className='appearance-none w-3 h-3 border-2 rounded-sm border-black checked:bg-button' type="checkbox" id="Alternance" name="Alternance" value="Alternance" onClick={contrat}/>
                            <label htmlFor="Alternance">Alternance</label>
                        </div>
                        <div className='flex justify-center items-center gap-1'>
                            <input className='appearance-none w-3 h-3 border-2 rounded-sm border-black checked:bg-button' type="checkbox" id="Freelance" name="Freelance" value="Freelance" onClick={contrat}/>
                            <label htmlFor="Freelance">Freelance</label>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full items-center lg:items-start  gap-5 md:pb-5'>
                    <h2 className='text-lg font-semibold lg:pl-5'>Télétravail :</h2>
                    <div className='flex flex-wrap justify-center gap-5'>
                        <div className='flex justify-center items-center gap-1'>
                            <input className='appearance-none w-3 h-3 border-2 rounded-sm border-black checked:bg-button' type="checkbox" id="Total" name="Total" value="Total" onClick={télétravail}/>
                            <label htmlFor="Total">Total</label>
                        </div>
                        <div className='flex justify-center items-center gap-1'>
                            <input className='appearance-none w-3 h-3 border-2 rounded-sm border-black checked:bg-button' type="checkbox" id="Partielle" name="Partielle" value="Partielle" onClick={télétravail}/>
                            <label htmlFor="Partielle">Partielle</label>
                        </div>
                        <div className='flex justify-center items-center gap-1'>
                            <input className='appearance-none w-3 h-3 border-2 rounded-sm border-black checked:bg-button' type="checkbox" id="Négociable" name="Négociable" value="Négociable"onClick={télétravail} />
                            <label htmlFor="Négociable">Négociable</label>
                        </div>
                        <div className='flex justify-center items-center gap-1'>
                            <input className='appearance-none w-3 h-3 border-2 rounded-sm border-black checked:bg-button' type="checkbox" id="Interdit" name="Interdit" value="Interdit" onClick={télétravail}/>
                            <label htmlFor="Interdit</div>">Interdit</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img className='w-5 h-5 ml-5 sticky translate-x-2/4 bottom-1/3 left-2/4 top-0 md:hidden bg-white md:bg-none cursor-pointer bottom-image' src={filter ? "/arrowright.svg" : "/arrowleft.svg"} onClick={handlefilter} alt="" />
    </div>
   
    </div>
    </>
    );
}
