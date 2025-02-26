# Coin Flip Agile Exercise

## Architecture

Built using react js.

## Dependencies

1. Node API
   1. Socket IO
   2. GET /api
2. Firebase Application

## Release

1. Node API

   1. Google Cloud
      1. Install and login to goggle cloud cli then run the following command.
      2. gcloud run deploy --project coinflipapi-50514 --allow-unauthenticated --source=.
      3. Service name (coinflipserver): chatserver

2. Coin flip Application
   1. Firebase https://console.firebase.google.com/project/coinflipgame-50514/overview
   2. To Deploy from Terminal: ./Firebasedeploy

## Play

1. Flip the required number of coins over
2. Ship the coins to the next player

## Domain Diagram

```mermaid
classDiagram
   class BoxOfCoins {
      -playersData: Array
      -timers: Array
      -gametype: Array
      -socket: Object
      +useEffect(): void
      +render(): JSX
   }

   class RenderPlayers {
      -players: Array
      -socket: Object
      -timers: Array
   }

   class TabsforGameSelector {
      -socket: Object
   }

   class GameSlice {
      +flipCoin(data: Object): Action
      +resetCoins(data: Object): Action
   }

   class GameTypeSlice {
      +setGameTypeData(gametype: Object): Action
   }

   class TimerSlice {
      +setTimerPlayerName(player: Object): Action
      +setResetTime(reset: boolean): Action
   }

   class ActionSlice {
      +setAction(disable: Object): Action
   }

   class PlayerSlice {
      +setPlayerData(player: Object): Action
      +selectPlayersData(): Selector
   }

   class SendUserLoggedIn {
      +send(socket: Object, player: Object): void
   }

   BoxOfCoins --> RenderPlayers : renders
   BoxOfCoins --> TabsforGameSelector : renders
   BoxOfCoins --> GameSlice : dispatches actions
   BoxOfCoins --> GameTypeSlice : dispatches actions
   BoxOfCoins --> TimerSlice : dispatches actions
   BoxOfCoins --> ActionSlice : dispatches actions
   BoxOfCoins --> PlayerSlice : dispatches actions & selects data
   BoxOfCoins --> SendUserLoggedIn : invokes
```

## Game Event Diagram

```mermaid
   sequenceDiagram
    participant S as Socket
    participant GA as Google Analytics

    Note over S,GA: SendCoinEvent
    S->>S: emit sendcoin
    S->>GA: log shipped coin event

    Note over S,GA: SendPlayerStarted
    S->>S: emit playerstarted
    S->>GA: log Player Started flipping

    Note over S,GA: SendStopGameTimer
    S->>S: emit stoptimer
    S->>GA: log game should be over

    Note over S,GA: SendSyncGameTimer
    alt socket.id == data[0]
        S->>S: emit syncgametimer
    end
    S->>GA: log sync games

    Note over S,GA: SendUpdatePlayerTimes
    S->>S: emit playertimeupdated
    S->>GA: log updated time for shipping

    Note over S,GA: SendStartGameTimer
    alt data[2] == data[0]
        S->>S: emit starttimer
    end
    S->>GA: log game should be started

    Note over S,GA: SendFirstValue
    S->>S: emit finaltimer
    S->>GA: log tried first value

    Note over S,GA: SendUserLoggedIn
    S->>S: emit player
    S->>GA: log user is logged in

    Note over S,GA: SendPlayerStopped
    S->>S: emit playerstopped
    S->>GA: log player is stopped

    Note over S,GA: SendGameTypeChanged
    S->>S: emit gametype
    S->>GA: log game type changed

    Note over S,GA: TryToSendGameTimerMessage
    S->>S: emit starttimer (via SendStartGameTimer)
    S->>GA: log start the game

    Note over S,GA: TryAndSendCoinFlipMessage
    alt id > 0
        S->>S: emit message
    end
    S->>GA: log Coin flipped

    Note over S,GA: SendActionEvent
    alt eventData[0]
        S->>S: emit action
    end
    S->>GA: log action event


```

## Timer Event Diagram

```mermaid
sequenceDiagram
    participant SPTE as SendPlayerTimerEvents
    participant SPSE as SendPlayerStartedEvent
    participant TASFLPE as TryAndSendFirstValueAndLastPlayerEvents
    participant TASNLP as TryAndSendNotLastPlayer
    participant SFVALP as SendFirstValueAndLastPlayer
    participant SEFLP as SendEventsForLastPlayer
    participant PHSAC as PlayerHasShippedAllCoins
    participant SPS as SendPlayerStarted
    participant SPF as SendFirstValue
    participant SPSD as SendPlayerStopped
    participant SSGT as SendStopGameTimer

    SPTE->>TASFLPE: Calls
    SPTE->>TASNLP: Calls
    SPSE->>SPS: Calls if conditions met
    TASFLPE->>SFVALP: Calls if conditions met
    TASFLPE->>SPF: Calls if other conditions met
    SFVALP->>SPF: Calls if conditions met
    SFVALP->>SEFLP: Calls
    TASNLP->>PHSAC: Calls if not last player
    SEFLP->>SSGT: Calls
    SEFLP->>SPSD: Calls
    PHSAC->>SPSD: Calls if all coins flipped
```

## Player state Diagram

```mermaid
classDiagram
    class store {
        -imageReducer
        -timerReducer
        -resetReducer
        -gameTypeReducer
        -playerReducer
        -actionReducer
    }
    class imageReducer {
        <<reducer>>
        <<statemanaged>>
    }
    class timerReducer {
        <<reducer>>
        <<statemanaged>>
    }
    class resetReducer {
        <<reducer>>
    }
    class gameTypeReducer {
        <<reducer>>
        <<statemanaged>>
    }
    class playerReducer {
        <<reducer>>
        <<statemanaged>>
    }
    class actionReducer {
        <<reducer>>
    }

    store --|> imageReducer : includes
    store --|> timerReducer : includes
    store --|> resetReducer : includes
    store --|> gameTypeReducer : includes
    store --|> playerReducer : includes
    store --|> actionReducer : includes
```
