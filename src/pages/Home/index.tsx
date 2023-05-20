import { Typography, useTheme } from '@mui/material'
import { memo } from 'react'
import {
  Button,
  FaqCard,
  Logo,
  PopularTripGalleryCard,
  UserCard
} from 'src/components'
import MainContainer from 'src/components/MainContainer'
import { useAuth } from 'src/hooks'

const userInfo1 = {
  id: '1',
  mainInfo: {
    name: 'Charlie Hummel',
    lastTripLocation: 'Utila, Honduras'
  },
  profileImage: 'https://mui.com/static/images/avatar/2.jpg',
  bannerImage: '/images/profileBanner1.jpg'
}

const userInfo2 = {
  id: '2',
  mainInfo: {
    name: 'Chloe Amande',
    lastTripLocation: 'Egypt'
  },
  profileImage: 'https://mui.com/static/images/avatar/5.jpg',
  bannerImage: '/images/profileBanner2.jpg'
}

const userInfo3 = {
  id: '3',
  mainInfo: {
    name: 'Kate Ericson',
    lastTripLocation: 'Colombia'
  },
  profileImage: 'https://mui.com/static/images/avatar/1.jpg',
  bannerImage: '/images/profileBanner3.jpg'
}

const userInfo4 = {
  id: '4',
  mainInfo: {
    name: 'Charlie Hummel',
    lastTripLocation: 'Mali'
  },
  profileImage: 'https://mui.com/static/images/avatar/4.jpg',
  bannerImage: '/images/profileBanner4.jpg'
}

export const Home = memo(() => {
  const theme = useTheme()
  const { isAuthorized } = useAuth()

  return (
    <div className="w-full flex flex-col">
      <div className="w-full relative">
        <img
          src="/images/homebanner.png"
          className="w-full sm:h-auto h-[396px] object-cover object-[70%_90%]"
        />
        <img
          src="/images/homebannerback.png"
          className="h-auto w-11/12 sm:w-2/3 xl:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <MainContainer>
        <div className="sm:pt-[72px] pt-[43px] flex flex-col sm:gap-y-11 gap-y-6">
          <Typography className="sm:font-bold font-semibold sm:text-[32px] text-[28px]">
            Featured Travellers
          </Typography>
          <div className="flex-row xl:gap-x-[30px] gap-x-[20px] gap-y-[30px] grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 divide-x">
            <UserCard userProfile={userInfo1} />
            <UserCard userProfile={userInfo2} />
            <UserCard userProfile={userInfo3} />
            <div className="xl:block sm:hidden block">
              <UserCard userProfile={userInfo4} />
            </div>
          </div>
        </div>

        <div className="xl:pt-[102px] sm:pt-[70px] pt-[43px] flex flex-col sm:gap-y-11 gap-y-6">
          <Typography className="sm:font-bold font-semibold sm:text-[32px] text-[28px]">
            This is How You Vagavoy!
          </Typography>
          <div className="flex-row xl:gap-x-[30px] gap-x-[20px] gap-y-[30px] grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 divide-x">
            <FaqCard
              faqCardName="Discover"
              faqCardImageSrc="/images/discover.png"
              faqCardDescription="Find inspiring stories and connect with fellow travellers spending time in the places you dream of."
            />
            <FaqCard
              faqCardName="Explore"
              faqCardImageSrc="/images/explore.png"
              faqCardDescription="Explore new places and make memories with the people you meet along the way."
            />
            <FaqCard
              faqCardName="Record"
              faqCardImageSrc="/images/record.png"
              faqCardDescription="In the moment you think you’ll nevet forget... but then you do. Vagavoy ensures your memories withstand the test of time."
            />
            <FaqCard
              faqCardName="Share"
              faqCardImageSrc="/images/share.png"
              faqCardDescription="Easily share stories, trip galleries, recommendations and updates  with your friends, family and other fellow travellers."
            />
          </div>
        </div>

        <div className="xl:pt-[102px] sm:pt-[89px] pt-[77px] xl:pb-[90px] sm:pb-[70px] pb-[29px] flex flex-col sm:gap-y-11 gap-y-6">
          <Typography className="sm:font-bold font-semibold sm:text-[32px] text-[28px]">
            Popular Trip Galleries
          </Typography>
          <div className="flex-row xl:gap-x-[30px] gap-x-[20px] gap-y-[30px] grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 divide-x">
            <PopularTripGalleryCard
              tripGalleryCardImageSrc="/images/profileBanner1.jpg"
              tripGalleryCardLocation="Utila, Honduras"
            />
            <PopularTripGalleryCard
              tripGalleryCardImageSrc="/images/profileBanner2.jpg"
              tripGalleryCardLocation="Utila, Honduras"
            />
            <PopularTripGalleryCard
              tripGalleryCardImageSrc="/images/profileBanner3.jpg"
              tripGalleryCardLocation="Utila, Honduras"
            />
            <PopularTripGalleryCard
              tripGalleryCardImageSrc="/images/profileBanner4.jpg"
              tripGalleryCardLocation="Utila, Honduras"
            />
          </div>
        </div>
      </MainContainer>
      <div className="bg-white">
        <div className="w-full relative">
          <img
            src="/images/footerbanner.png"
            className="w-full h-[374px] object-cover object-[50%_100%]"
          />
          <div className="flex flex-col gap-y-8 items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Typography variant="h3" sx={{ color: 'white' }}>
              Discover, Explore, Record.
            </Typography>
            {isAuthorized ? (
              <></>
            ) : (
              <Button
                sx={{ width: 132 }}
                variant="contained"
                buttonLabel="Join Now"
                buttonFontBold={true}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-[106px] mt-2 relative">
          <Logo sx={{ position: 'absolute', top: '-27px' }} />
          <Typography
            sx={{
              fontSize: 12,
              color: theme.palette.green.middle,
              fontFamily: 'sans_pro'
            }}>
            © 2022 All rights reserved
          </Typography>
        </div>
      </div>
    </div>
  )
})

Home.displayName = 'Home'

export default Home
