A proof of concept for a type safe version of [**date-fp**](https://github.com/cullophid/date-fp)
that returns an `Either` if an operation results in an invalid date. Run time type checking
is provided by [**sanctuary-def**](https://github.com/plaid/sanctuary-def). All
types except `TimeUnit` are defined [there](https://github.com/plaid/sanctuary-def#types).

## Functions:

### add :: TimeUnit -> Integer -> ValidDate -> Either String ValidDate

### convertTo :: TimeUnit -> ValidDate -> ValidNumber

### diff :: TimeUnit -> ValidDate -> ValidDate -> Integer

### equals :: ValidDate -> ValidDate -> Boolean

### get :: TimeUnit -> ValidDate -> Integer

### isLeapYear :: ValidDate -> Boolean

### isValid :: Any -> Boolean

### min :: [ValidDate] -> ValidDate

### max :: [ValidDate] -> ValidDate

### parse :: String -> String -> Either String ValidDate

### set :: TimeUnit -> Integer -> ValidDate -> Either String ValidDate

### unixTime :: ValidDate -> Integer
