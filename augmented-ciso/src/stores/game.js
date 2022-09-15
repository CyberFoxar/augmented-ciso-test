import { defineStore } from "pinia";
import { useAuthStore } from "./userAuth"

export const useGameStore = defineStore('game-store', {
    state: () => {
        return {
            /** @type {{Risk}[]} */
            knownRisks: [],
            /** @type {{Measure}[]} */
            availableMeasures: [],
            budget: 100,
            maxMeasures: 3
        }
    },
    actions: {
        async fetchRisks() {
            const auth = useAuthStore()
            if (!auth.authToken) {
                throw new Error("user not authenticated")
            }

            return new Promise((resolve, reject) => {
                resolve(mockRisks);
                return;

                fetch(
                    "https://tt.augmentedciso.com/risk",
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'accept': 'application/json',
                            'Authorization': `Bearer ${auth.authToken}`
                        },
                    }
                ).then(async (response) => {
                    /** @type {{Risk}[]} */
                    const body = await response.json();
                    this.knownRisks = body;
                    resolve(body);
                }).catch(() => reject())
            })
        },
        async fetchMeasures() {
            const auth = useAuthStore()
            if (!auth.authToken) {
                throw new Error("user not authenticated")
            }

            return new Promise((resolve, reject) => {
                resolve(mockMeasures);
                return;

                fetch(
                    "https://tt.augmentedciso.com/measure",
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'accept': 'application/json',
                            'Authorization': `Bearer ${auth.authToken}`
                        },
                    }
                ).then(async (response) => {
                    /** @type {{Measure}[]} */
                    const body = await response.json();
                    this.availableMeasures = body;
                    resolve(body);
                }).catch(() => reject())
            })
        }
    }
})


export class Risk {
    name = ''
    identifier = ''
    severity = ''
}


export class Measure {
    name = ''
    identifier = ''
    cost = 0
}

export class GameResult {
  score = 0
  risks = [{
    identifier: '',
    coverage: 0,
    severity: 0
  }]
}

const mockRisks = [
    {
        "name": "Information system locked after ransomware attack",
        "identifier": "RISK-1",
        "severity": 4
    },
    {
        "name": "Information theft through exposed service compromission",
        "identifier": "RISK-2",
        "severity": 3
    },
    {
        "name": "Internet-exposed service DoS",
        "identifier": "RISK-3",
        "severity": 2
    },
    {
        "name": "Website defacement",
        "identifier": "RISK-4",
        "severity": 1
    }
]

const mockMeasures = [
    {
      "name": "Security Operation Center (SOC)",
      "identifier": "MEAS-32",
      "cost": 40
    },
    {
      "name": "Management of security crisis",
      "identifier": "MEAS-25",
      "cost": 25
    },
    {
      "name": "Management of security incidents",
      "identifier": "MEAS-28",
      "cost": 42
    },
    {
      "name": "Web application vulnerability scans",
      "identifier": "MEAS-113",
      "cost": 38
    },
    {
      "name": "Compliance assement",
      "identifier": "MEAS-7",
      "cost": 30
    },
    {
      "name": "Secure services exposed on the Internet",
      "identifier": "MEAS-19",
      "cost": 29
    },
    {
      "name": "Denial of Service (DoS, DDoS) protection",
      "identifier": "MEAS-34",
      "cost": 18
    },
    {
      "name": "Strong authentication",
      "identifier": "MEAS-57",
      "cost": 22
    },
    {
      "name": "Malware protection for workstations",
      "identifier": "MEAS-1",
      "cost": 15
    },
    {
      "name": "Mailbox protection",
      "identifier": "MEAS-3",
      "cost": 25
    },
    {
      "name": "Security dashboards",
      "identifier": "MEAS-8",
      "cost": 1
    },
    {
      "name": "Protect communciation channels",
      "identifier": "MEAS-51",
      "cost": 45
    },
    {
      "name": "Continuity / Disaster recovery plan",
      "identifier": "MEAS-49",
      "cost": 32
    },
    {
      "name": "Definition of security objectives",
      "identifier": "MEAS-125",
      "cost": 21
    },
    {
      "name": "External vulnerability scans",
      "identifier": "MEAS-105",
      "cost": 53
    }
  ]