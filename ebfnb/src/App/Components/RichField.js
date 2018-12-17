import {asField} from 'informed'
import classnames from 'classnames'
import {Field} from 'react-bulma-components/full'

const RichField=asField(
    (fieldState,children,Error=null,Label=null,...props)=>{(
        <Field {...props>}>
            <Label/>
            {children}
            <Error error={fieldState.error}/>
        </Field>
    )}
)
