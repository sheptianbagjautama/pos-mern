import { BsCashCoin } from "react-icons/bs"
import Greetings from "../components/home/Greetings"
import MiniCard from "../components/home/MiniCard"
import BottomNav from "../components/shared/BottomNav"
import { GrInProgress } from "react-icons/gr"
import RecentOrder from "../components/home/RecentOrder"
import PopularDishes from "../components/home/PopularDishes"

function Home() {
  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex">
        {/* Left Div */}
        <div className="flex-3">
            <Greetings/>
            <div className="flex items-center w-full gap-3 px-8 mt-8">
              <MiniCard title="Total Earnings" icon={<BsCashCoin/>} number={512} footerNum={1.6}/>
              <MiniCard title="In Progress" icon={<GrInProgress/>} number={16} footerNum={3.6}/>
            </div>
            <RecentOrder/>
        </div>
        {/* Right Div */}
        <div className="flex-2">
          <PopularDishes/>
        </div>
        <BottomNav/>
    </section>
  )
}

export default Home