import { schemaComposer,TypeComposer } from 'graphql-compose'

export default {schemaComposer,
    getOrCreate:{
        tc:schemaComposer.getOrCreateTC,
        itc:schemaComposer.getOrCreateITC,
    },
    otc:(name,)=>schemaComposer.getOrCreateTC({...restProps,
        fields:{...fields,
          errors:`[Error]`,
          data:dataType
        }
    })
}