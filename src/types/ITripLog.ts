import { ITripImage } from './ITripImage'
import { ITripRecommendation } from './ITripRecommendation'

export interface ITripLogBase {
  mainTrip?: boolean
  tripCountryCode?: string
  tripLocation?: string
  tripStartDate?: Date
  tripEndDate?: Date
  tripDescription?: string
  tripGallery?: ITripImage[]
  tripRecommendations?: ITripRecommendation[]
  notification?: boolean
}

export interface ITripLog extends ITripLogBase {
  tripLogId?: string
}
