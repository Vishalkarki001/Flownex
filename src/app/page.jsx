import Home from '@/app/(Static)/home/page'
import Header from './components/header'
import Footer from './components/footer'

export default function Page(){
  return(
    <>
    <div><Header/></div>
    <div><Home/></div>
    <div><Footer/></div>
    </>
  )
}