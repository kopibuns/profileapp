import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { postConfirmation } from "../auth/post-confirmation/resource";

/*=======================================================================
The section below define the schema for the UserProfile data model using a 
per-owner authorization rule allow.owner() to restrict the expense record’s 
access to the creator of the record.
It also uses the field profileOwner to track the ownership, and configures 
the authorization rule to allow the postConfirmation resource. 
Granting access to resources creates environment variables for your 
function, such as the GraphQL API endpoint.
=========================================================================*/

const schema = a
  .schema({
    UserProfile: a
      .model({
        email: a.string(),
        profileOwner: a.string(),
      })
      .authorization((allow) => [
        allow.ownerDefinedIn("profileOwner"),
      ]),
  })
  .authorization((allow) => [allow.resource(postConfirmation)]);
export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
