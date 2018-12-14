import {schemaComposer,TypeComposer} from 'graphql-compose'

//This is a hack around resolvers returning null
TypeComposer.create(`type Void {void:Boolean}`)