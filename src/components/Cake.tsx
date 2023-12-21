import React from 'react';

const Cake: React.FC<{addCandle: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void}> = ({addCandle}) => {

    const randomPosition = () => {
        return Math.random() * 192;
    }
    
    const randomRotation = () => {
        return Math.random() * 360;
    }

    const randomColor = () => {
        const colors = ['bg-red-600', 'bg-yellow-600', 'bg-green-600'];
        return colors[Math.floor(Math.random() * 3)];
    }

    const [dots, setDots] = React.useState<{rotation: number, position: number, color: string}[]>([])
    
    React.useEffect(() => {
        const dots = [...Array(200)].map(() => ({
            rotation: randomRotation(),
            position: randomPosition(),
            color: randomColor()
        }))
        setDots(dots)
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-screen relative">
            <svg onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => addCandle(e)} className="w-[365px] h-[365px] rounded-full skew-y-[50deg] -rotate-[60.5deg] absolute z-[11] hover:cursor-pointer"></svg>
            <div className="w-96 h-96 bg-amber-950 rounded-full skew-y-[50deg] -rotate-[60.5deg] absolute border-4 border-amber-950 z-[10]">
                <div className='w-full h-full'>
                    {
                        dots.map((candle, i) => (
                            <div key={i} className='h-full w-4 absolute left-[180px]' style={{rotate: candle.rotation + 'deg'}}>
                                <div className={`${candle.color} h-4 w-4 rounded-full`} style={{marginTop: candle.position + 'px'}}></div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="w-[42.25rem] h-[72px] bg-red-600 absolute border-x-4 border-red-700 mt-[70px] z-[9]"></div>
            <div className="w-96 h-96 bg-red-600 rounded-full skew-y-[50deg] -rotate-[60.5deg] absolute border-[3px] border-red-700 mt-[144px] z-[8]"></div>
            <div className="w-[42.25rem] h-[72px] bg-yellow-600 absolute border-x-4 border-yellow-700 mt-[214px] z-[7]"></div>
            <div className="w-96 h-96 bg-yellow-600 rounded-full skew-y-[50deg] -rotate-[60.5deg] absolute border-[3px] border-yellow-700 mt-[288px] z-[6]"></div>
            <div className="w-[42.25rem] h-[72px] bg-green-600 absolute border-x-4 border-green-700 mt-[358px] z-[5]"></div>
            <div className="w-96 h-96 bg-green-600 rounded-full skew-y-[50deg] -rotate-[60.5deg] absolute border-[3px] border-green-700 mt-[432px] z-[4]"></div>
        </div>
    );
};

export default Cake;
