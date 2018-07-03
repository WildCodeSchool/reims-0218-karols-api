# How to plan resources for the booking system

## Resource collection

### Resources represents:

- many prestation identified by a specific identifying string type (ex: MAQ_ULT for maquillage ultime)
- a table

### Each resources should be an object with following fields:

- quantity
- week avaibility to helps create timeslots
- a shop affectation
- unavailable dates
- an on/off bool
- a duration by preparation
- prestations types

### How to compute timeslots

- We receive following info :
  - a date
  - an array of prestation (or table)

ex:

```
bookingRequest = {
    date: 29/07/2018,
    preparations: [
        {type: MAQ_ULT},
        {type: COIFF_STYL},
        {type: ONGLE}
    ]
}

// Add the intervals logic
// i1 starts at the begining of the first day
// i2 starts after i1
// i3 starts after i2

bookingRequestWithIntervals = {
    date: 29/07/2018,
    preparations: [
        {type: MAQ_ULT, interval : i1},
        {type: COIFF_STYL, interval : i2},
        {type: ONGLE, interval : i3}
    ]
}
```

## Build a day request : for each timeslots of the day

```
// get start time from Resource with the first same type and shop

timeSlotsIntervals = [
    {
        time: 9H00,

    }
]
```

## Validate against existing bookings
