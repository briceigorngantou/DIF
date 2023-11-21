import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { AlertTitle, Slide, SlideProps } from '@mui/material'
import { closeSnackbar, snackBarinfo } from '../../__services'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function TransitionLeft(props: SlideProps) {
  return <Slide {...props} direction='left' />
}

export default function AlertComponent() {
  const [state, setState] = React.useState<any>()

  React.useEffect(() => {
    snackBarinfo.subscribe(observer => setState(observer))
  }, [])

  return (
    <Snackbar
      open={state?.isOpened}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      TransitionComponent={TransitionLeft}
      autoHideDuration={state?.timeOut ?? 5000}
      onClose={() => closeSnackbar()}
    >
      <Alert
        onClose={() => closeSnackbar()}
        severity={state?.type ? state?.type?.toLowerCase() : 'success'}
        sx={{ width: '100%' }}
      >
        <AlertTitle color='white' sx={{ textTransform: 'capitalize' }}>{state?.type}</AlertTitle>
        {state?.message}
        {state?.link && <div dangerouslySetInnerHTML={{ __html: `${state?.link}` }}></div>}
      </Alert>
    </Snackbar>
  )
}
