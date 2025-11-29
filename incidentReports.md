# Incident: 2025-11-29 11-07-32

## Summary

```md
Between the hour of 11:07 and 11:30 on 11/29/2025, Pizza's where unable to be bought due to a chaos test that was initialized.

A bug in this code caused users to be unable to purchase pizzas from the franchise. The event was detected by the logging and metrics system, showing that no successful pizzas were being bought and failures had skyrocketed. The team started working on the event by 11:09.
```

## Detection

```md
This incident was detected when the a programmer noticed that there had been a significant amount of pizza purchase failures and the complete lack of pizza purchases on the grafana dashboard.

An alert wasn't detected for this so it was lucky that the programmer was watching the logs at the time

There was an alert in place but it wasn't triggering the threshold, the alert will be adjusted to make sure that this is fixed when no purchases are being made
```

## Impact

```md
For 23 minutes between 18:07 UTC and 18:30 UTC on 11/29/25, The lack of purchases of pizza is what our users experienced this incident.

This incident affected all customers until the incident was resolved.
```

## Timeline

```md
All times are UTC.

- _18:07_ - Error with purchasing pizza occured
- _18:09_ - Team noticed the error and started working on the error
- _18:25_ - Link to end chaos was found
- _18:30_ - Link clicked on and purchasing pizza back up and running
```

## Response

```md
After noticing a problem at 18:07 UTC, Skyler came online at 18:09 UTC in Provo, UT.

The engineer found the link to end chaos and clicked it to end the Chaos
```

## Root cause

```md
Purchases were halted due to chaos being intiated. A link needed to be clicked to fix the response
```

## Resolution

```md
Clicked on the link to end chaos the pizza purchases
```

## Action items

```md
1. Update the alert for quicker detection and better detection of chaos and issues with pizza purchases
```
