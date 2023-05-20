import React, { memo, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MainContainer from 'src/components/MainContainer'
import UserSearchResult from 'src/components/UserSearchResult'
import { useAuth } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { IProfile } from 'src/types'

export const SearchResult = memo(() => {
  const [search] = useSearchParams()
  const [results, setResults] = useState<IProfile[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const term = search.get('term')
    axiosInstance
      .post('/user/search', { userId: user.id || '', searchKey: term })
      .then((res) => {
        setResults(res.data)
      })
      .catch((err) => console.log(err))
  }, [search, user])

  return (
    <MainContainer className="w-full min-h-[calc(100vh-80px)]">
      <div className="flex flex-col sm:gap-y-9 gap-y-8 w-full h-full mt-8 xl:px-6 items-start">
        <span className="text-[28px] font-semibold leading-6">
          Search Results
        </span>
        <div className="flex flex-col gap-y-4 sm:gap-y-6 w-full">
          {results.length > 0 ? (
            results
              .filter((result) => result._id !== user.id)
              .map((profile, index) => (
                <UserSearchResult
                  key={profile._id || index}
                  profile={profile}
                />
              ))
          ) : (
            <span className="text-4xl font-semibold leading-6 text-green-700 text-center mt-8">
              No Result
            </span>
          )}
        </div>
      </div>
    </MainContainer>
  )
})

SearchResult.displayName = 'SearchResult'

export default SearchResult
