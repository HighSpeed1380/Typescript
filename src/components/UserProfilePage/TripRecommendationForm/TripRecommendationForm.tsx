import { Autocomplete } from '@mui/material'
import { FC } from 'react'
import Button from 'src/components/Button'
import TextField from 'src/components/TextField'
import { ITripRecommendation } from 'src/types'

export interface ITripRecommendationFormProps {
  tripRecommendations: ITripRecommendation[]
  handleChangeTripRecommendations: (
    tripRecommendations: ITripRecommendation[]
  ) => void
  className?: string
}

const recommendationTitles = [
  'Accommodation',
  'Eating & Drinking',
  'Getting There & Getting Around',
  'Activities',
  'Other Tips'
]

export const TripRecommendationForm: FC<ITripRecommendationFormProps> = ({
  tripRecommendations,
  handleChangeTripRecommendations,
  className
}) => {
  const handleChangeDescription = (index: number, description: string) => {
    handleChangeTripRecommendations(
      tripRecommendations.map((tr, i) =>
        i === index ? { ...tr, description } : tr
      )
    )
  }

  const handleChangeTitle = (index: number, title: string) => {
    handleChangeTripRecommendations(
      tripRecommendations.map((tr, i) => (i === index ? { ...tr, title } : tr))
    )
  }

  const handleAddButtonClick = () => {
    const newTripRecommendations = [...tripRecommendations]
    newTripRecommendations.push({
      title: '',
      description: ''
    })
    handleChangeTripRecommendations(newTripRecommendations)
  }

  return (
    <div className={className}>
      <div className="flex flex-col gap-y-4 sm:mt-10 mt-8 text-lg leading-6 font-bold">
        <span>Trip Recommendations</span>
        {tripRecommendations.length ? (
          tripRecommendations.map((recommendation, index) => (
            <div className="flex flex-col gap-y-4" key={index}>
              <Autocomplete
                value={recommendation.title}
                disablePortal
                disableClearable={true}
                id="combo-box-demo"
                options={recommendationTitles}
                sx={{ width: '100%', fontColor: 'green' }}
                onChange={(_e, value) => handleChangeTitle(index, value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select a section"
                    sx={{
                      '& .MuiSvgIcon-root': {
                        color: '#003300'
                      }
                    }}
                  />
                )}
              />
              <TextField
                value={recommendation.description}
                label="Information"
                multiline={true}
                placeholder="Write some things you want to remember and / or tips that could help other travellers"
                rows={5}
                onChange={(e) => handleChangeDescription(index, e.target.value)}
              />
            </div>
          ))
        ) : (
          <></>
        )}
        <Button
          buttonLabel="Add Next"
          variant="outlined"
          buttonFontBold
          buttonLeftIconName="Pencil"
          sx={{
            width: 150,
            padding: '10px 14px',
            justifyContent: 'flex-start'
          }}
          onClick={handleAddButtonClick}
        />
      </div>
    </div>
  )
}

TripRecommendationForm.displayName = 'TripRecommendationForm'

export default TripRecommendationForm
