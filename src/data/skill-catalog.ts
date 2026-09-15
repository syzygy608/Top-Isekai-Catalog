import type { SkillDefinition } from '../types/hero';

export const skillCatalog = {
  "s01": {
    "description": "每 10 秒釋放一次傷害係數為 1800% 的攻擊",
    "effects": [
      {
        "type": "periodicDamage",
        "value": 1800,
        "unit": "percent",
        "condition": "每 10 秒"
      }
    ]
  },
  "s02": {
    "description": "集結車冒險者容量增加 10%",
    "effects": [
      {
        "type": "rallyCapacityUp",
        "value": 10,
        "unit": "percent",
        "target": "集結車"
      }
    ]
  },
  "s03": {
    "description": "對其他玩家傷害增加 30%",
    "effects": [
      {
        "type": "playerDamageUp",
        "value": 30,
        "unit": "percent",
        "target": "其他玩家"
      }
    ]
  },
  "s04": {
    "description": "攻擊總部時，每秒造成係數 2% 的額外傷害",
    "effects": [
      {
        "type": "headquartersDamagePerSecond",
        "value": 2,
        "unit": "percent",
        "target": "總部",
        "condition": "攻擊時，每秒"
      }
    ]
  },
  "s05": {
    "description": "單兵出擊冒險者容量增加 10%",
    "effects": [
      {
        "type": "soloCapacityUp",
        "value": 10,
        "unit": "percent",
        "target": "單兵出擊"
      }
    ]
  },
  "s06": {
    "description": "駐防建築/總部時，每秒造成係數 2% 的額外傷害",
    "effects": [
      {
        "type": "garrisonDamagePerSecond",
        "value": 2,
        "unit": "percent",
        "target": "建築/總部",
        "condition": "駐防時，每秒"
      }
    ]
  },
  "s07": {
    "description": "對世界守衛傷害增加 30%",
    "effects": [
      {
        "type": "worldGuardianDamageUp",
        "value": 30,
        "unit": "percent",
        "target": "世界守衛"
      }
    ]
  },
  "s08": {
    "description": "普攻傷害增加 50%",
    "effects": [
      {
        "type": "normalAttackDamageUp",
        "value": 50,
        "unit": "percent"
      }
    ]
  },
  "s09": {
    "description": "技能傷害增加 20%",
    "effects": [
      {
        "type": "skillDamageUp",
        "value": 20,
        "unit": "percent"
      }
    ]
  },
  "s10": {
    "description": "普攻傷害減少 12%",
    "effects": [
      {
        "type": "normalAttackDamageDown",
        "value": 12,
        "unit": "percent"
      }
    ]
  },
  "s11": {
    "description": "技能傷害減少 12%",
    "effects": [
      {
        "type": "skillDamageDown",
        "value": 12,
        "unit": "percent"
      }
    ]
  },
  "s12": {
    "description": "提升行車速度 75%",
    "effects": [
      {
        "type": "marchSpeedUp",
        "value": 75,
        "unit": "percent"
      }
    ]
  },
  "s13": {
    "description": "對世界守衛傷害增加 20%，提升行車速度 50%",
    "effects": [
      {
        "type": "worldGuardianDamageUp",
        "value": 20,
        "unit": "percent",
        "target": "世界守衛"
      },
      {
        "type": "marchSpeedUp",
        "value": 50,
        "unit": "percent"
      }
    ]
  },
  "s14": {
    "description": "攻擊建築時，每秒造成係數 1.8% 的額外傷害，集結車冒險者容量增加 10%",
    "effects": [
      {
        "type": "buildingDamagePerSecond",
        "value": 1.8,
        "unit": "percent",
        "target": "建築",
        "condition": "攻擊時，每秒"
      },
      {
        "type": "rallyCapacityUp",
        "value": 10,
        "unit": "percent",
        "target": "集結車"
      }
    ]
  },
  "s15": {
    "description": "技能傷害增加 30%",
    "effects": [
      {
        "type": "skillDamageUp",
        "value": 30,
        "unit": "percent"
      }
    ]
  },
  "s16": {
    "description": "對其他玩家傷害增加 20%",
    "effects": [
      {
        "type": "playerDamageUp",
        "value": 20,
        "unit": "percent",
        "target": "其他玩家"
      }
    ]
  },
  "s17": {
    "description": "提升行車速度 40%，減少行動力消耗 20%",
    "effects": [
      {
        "type": "marchSpeedUp",
        "value": 40,
        "unit": "percent"
      },
      {
        "type": "staminaCostDown",
        "value": 20,
        "unit": "percent"
      }
    ]
  },
  "s18": {
    "description": "技能傷害增加 5%",
    "effects": [
      {
        "type": "skillDamageUp",
        "value": 5,
        "unit": "percent"
      }
    ]
  },
  "s19": {
    "description": "駐防建築/總部時，每秒造成係數 2% 的額外傷害",
    "effects": [
      {
        "type": "garrisonDamagePerSecond",
        "value": 2,
        "unit": "percent",
        "condition": "每 1 秒"
      }
    ]
  },
  "s20": {
    "description": "對世界守衛傷害增加 30%",
    "effects": [
      {
        "type": "worldGuardianDamageUp",
        "value": 30,
        "unit": "percent"
      }
    ]
  },
  "s21": {
    "description": "每 10 秒釋放一次傷害係數為 1800% 的攻擊",
    "effects": [
      {
        "type": "periodicDamage",
        "value": 1800,
        "unit": "percent"
      }
    ]
  }
} satisfies Record<string, SkillDefinition>;
