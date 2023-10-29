# music-library

A sandbox to try different options to solve the N+1 problem for GraphQL

Links:

- [GraphQL DataLoader](https://github.com/graphql/dataloader)
- [Handling the N+1 problem](https://www.apollographql.com/docs/federation/entities-advanced/#handling-the-n1-problem)
- [How to solve the GraphQL n+1 problem](https://hygraph.com/blog/graphql-n-1-problem)
- [Solving the N+1 Problem for GraphQL through Batching](https://shopify.engineering/solving-the-n-1-problem-for-graphql-through-batching)
- [Using DataLoader in GraphQL](https://oliha.dev/articles/using-dataloader-in-graphql/)
- [How to Avoid the N+1 Query Problem in GraphQL and REST APIs [with Benchmarks]](https://www.freecodecamp.org/news/n-plus-one-query-problem/)
- [How Federation handles the N+1 query problem](https://www.apollographql.com/docs/technotes/TN0019-federation-n-plus-1/)

## Artist Table

| id                                   | name                  |
---------------------------------------|-----------------------|
| 45dcb764-fae3-4c4c-a80a-c62c7a8c63e4 | Death From Above 1979 |
| 1208199a-1ef6-4a06-bc9f-70aa03368625 | Nirvana               |
| dd81592f-e7ef-4511-8638-00651d04de4a | Korn                  |
| dbb585d5-2809-4f86-913a-4be5aee3cd60 | Placebo               |
| a48e988e-5f9c-4119-bf98-f3555851a749 | The Smashing Pumpkins |

## Album Table

| id                                   | title                                  | artistId                              |
---------------------------------------|----------------------------------------|---------------------------------------|
| 1003df9f-5f2d-437b-9f50-fecdc3fc2017 | You're A Woman, I'm A Machine          | 45dcb764-fae3-4c4c-a80a-c62c7a8c63e4  |
| 2cab7d93-3128-4259-ac93-91c218ae8005 | The Physical World                     | 45dcb764-fae3-4c4c-a80a-c62c7a8c63e4  |
| 6af76193-334a-4d51-86b9-361dd98ddc16 | Nevermind                              | 1208199a-1ef6-4a06-bc9f-70aa03368625  |
| 8bbdfd79-822b-4308-af3a-71ea9e1e909b | In Utero                               | 1208199a-1ef6-4a06-bc9f-70aa03368625  |
| 50517639-e926-4acd-a43c-026a88d786a3 | Bleach                                 | 1208199a-1ef6-4a06-bc9f-70aa03368625  |
| 3a537eb5-6391-41fd-9617-173b5ae33365 | Follow The Leader                      | dd81592f-e7ef-4511-8638-00651d04de4a  |
| cb7dcafd-22b6-435f-9b8e-d29b3c3520e2 | Issues                                 | dd81592f-e7ef-4511-8638-00651d04de4a  |
| 35fdc109-bfb4-4cc1-9bff-34f4f9c1d306 | Korn                                   | dd81592f-e7ef-4511-8638-00651d04de4a  |
| b044a420-8b37-4993-9023-eed20fed6b4e | Placebo                                | dbb585d5-2809-4f86-913a-4be5aee3cd60  |
| b4771f1d-ec32-4ab2-9e72-23ce8107b49b | Without You I'm Nothing                | dbb585d5-2809-4f86-913a-4be5aee3cd60  |
| 85f8edc2-d71a-4f4e-80bb-d9a2ccbd0449 | Black Market Music                     | dbb585d5-2809-4f86-913a-4be5aee3cd60  |
| fa87869d-f0c8-4a60-a38b-fd75e00c8a14 | Sleeping with Ghosts                   | dbb585d5-2809-4f86-913a-4be5aee3cd60  |
| 4cc3ec53-a0da-4dd9-ba7e-204b6c235f9c | Meds                                   | dbb585d5-2809-4f86-913a-4be5aee3cd60  |
| 5ae34577-8f56-4f1e-a8fc-fbae40ad4d21 | Battle for the Sun                     | dbb585d5-2809-4f86-913a-4be5aee3cd60  |
| 06737bac-d1e0-4240-96d3-807ba215be45 | Siamese Dream                          | a48e988e-5f9c-4119-bf98-f3555851a749  |
| 520d028f-10e9-444f-a4dd-6e2b01f3e3cf | Mellon Collie and the Infinite Sadness | a48e988e-5f9c-4119-bf98-f3555851a749  |
| f847c3ed-c79c-4f50-83b3-2825b0fe00f4 | Adore                                  | a48e988e-5f9c-4119-bf98-f3555851a749  |
