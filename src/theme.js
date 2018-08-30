import { createMuiTheme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'

export default createMuiTheme({
    palette: {
        primary: {
            main: grey[900]
        },
        secondary: red
    }
})
