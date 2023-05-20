// import 'react-slideshow-image/dist/styles.css'
import './App.css'

import { ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  // Navigate,
  Route,
  Routes
} from 'react-router-dom'

import { AppLayout } from '../src/components'
import { useTheme } from './contexts'
import { ScrollToTop } from './hooks'
import { SocketConnect } from './hooks/SocketConnect'
import { ProvideAuth } from './hooks/useAuth'
import {
  Connections,
  Home,
  Messages,
  News,
  SearchResult,
  TripGallery,
  UserProfile
} from './pages'
import TripRecommendations from './pages/TripRecommendations'
import { store } from './store/store'

function App() {
  const { theme } = useTheme()

  return (
    <Provider store={store}>
      <ProvideAuth>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Router>
              <SocketConnect>
                <ScrollToTop>
                  <Routes>
                    <Route path="/" element={<AppLayout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/profile/:id" element={<UserProfile />} />
                      <Route path="/searchResult" element={<SearchResult />} />
                      <Route path="/connections" element={<Connections />} />
                      <Route path="/news" element={<News />} />
                      <Route path="/messages" element={<Messages />} />
                      <Route
                        path="/gallery/:id/:tripLogId"
                        element={<TripGallery />}
                      />
                      <Route
                        path="/recommendations/:id/:tripLogId"
                        element={<TripRecommendations />}
                      />
                    </Route>
                  </Routes>
                </ScrollToTop>
              </SocketConnect>
            </Router>
          </div>
        </ThemeProvider>
      </ProvideAuth>
    </Provider>
  )
}

export default App
