import type { Hero } from '../types/hero';

export const heroes = [
  {
    "id": "Talia",
    "name": "塔莉婭 Talia",
    "faction": "truth",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [
      "rally"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
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
      {
        "slot": 3,
        "description": "對其他玩家傷害增加 30%",
        "effects": [
          {
            "type": "playerDamageUp",
            "value": 30,
            "unit": "percent",
            "target": "其他玩家"
          }
        ]
      }
    ],
    "tags": [
      "失落之城 S1",
      "S1 預熱",
      "失落之城 S2",
      "S2 電影大亨"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Augustine",
    "name": "奧古斯汀 Augustine",
    "faction": "truth",
    "rarity": "ssr",
    "positions": [
      "defender"
    ],
    "tacticalRoles": [
      "assault"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
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
      {
        "slot": 3,
        "description": "單兵出擊冒險者容量增加 10%",
        "effects": [
          {
            "type": "soloCapacityUp",
            "value": 10,
            "unit": "percent",
            "target": "單兵出擊"
          }
        ]
      }
    ],
    "tags": [
      "最強轉生者",
      "絕版"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Gemma",
    "name": "嘉瑪 Gemma",
    "faction": "truth",
    "rarity": "ssr",
    "positions": [
      "striker"
    ],
    "tacticalRoles": [
      "garrison"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
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
      {
        "slot": 3,
        "description": "對世界守衛傷害增加 30%",
        "effects": [
          {
            "type": "worldGuardianDamageUp",
            "value": 30,
            "unit": "percent",
            "target": "世界守衛"
          }
        ]
      }
    ],
    "tags": [
      "祈願"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Minna 01",
    "name": "明娜一號 Minna 01",
    "faction": "truth",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [
      "general"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "技能傷害增加 20%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 20,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "新手適合",
      "低課適合",
      "祈願"
    ],
    "synergyPartnerIds": [
      "Elysia"
    ]
  },
  {
    "id": "Bestla",
    "name": "貝斯特拉 Bestla",
    "faction": "truth",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [
      "assault"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "對其他玩家傷害增加 30%",
        "effects": [
          {
            "type": "playerDamageUp",
            "value": 30,
            "unit": "percent",
            "target": "其他玩家"
          }
        ]
      }
    ],
    "tags": [
      "重課專屬",
      "天空之境"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Agnes",
    "name": "愛格尼絲 Agnes",
    "faction": "truth",
    "rarity": "ssr",
    "positions": [
      "striker"
    ],
    "tacticalRoles": [
      "general"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "技能傷害增加 20%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 20,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "寒霜之地 S1",
      "S1 商店"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Valeria",
    "name": "瓦萊莉婭 Valeria",
    "faction": "truth",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [
      "assault"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
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
      {
        "slot": 3,
        "description": "對其他玩家傷害增加 30%",
        "effects": [
          {
            "type": "playerDamageUp",
            "value": 30,
            "unit": "percent",
            "target": "其他玩家"
          }
        ]
      }
    ],
    "tags": [
      "寒霜之地 S1",
      "失落之城 S1",
      "失落之城 S2",
      "跨服拍賣會"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Berta",
    "name": "柏妲 Berta",
    "faction": "glory",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [
      "general"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "技能傷害增加 20%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 20,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "秘藏館",
      "新手適合"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Nakazawa",
    "name": "中澤佐娜 Nakazawa",
    "faction": "glory",
    "rarity": "ssr",
    "positions": [
      "striker"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
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
      {
        "slot": 3,
        "description": "技能傷害增加 20%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 20,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "同盟商店",
      "新手適合",
      "祈願"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Arctis",
    "name": "阿克蒂斯 Arctis",
    "faction": "glory",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [
      "assault"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "單兵出擊冒險者容量增加 10%",
        "effects": [
          {
            "type": "soloCapacityUp",
            "value": 10,
            "unit": "percent",
            "target": "單兵出擊"
          }
        ]
      }
    ],
    "tags": [
      "寒霜之地 S1",
      "S1 巨龍之寶"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Lexa",
    "name": "萊克莎 Lexa",
    "faction": "glory",
    "rarity": "ssr",
    "positions": [
      "striker"
    ],
    "tacticalRoles": [
      "assault"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害減少 12%",
        "effects": [
          {
            "type": "normalAttackDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "對其他玩家傷害增加 30%",
        "effects": [
          {
            "type": "playerDamageUp",
            "value": 30,
            "unit": "percent",
            "target": "其他玩家"
          }
        ]
      }
    ],
    "tags": [
      "失落之城 S2",
      "S2 巨龍之寶"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Selena",
    "name": "賽琳娜 Selena",
    "faction": "glory",
    "rarity": "ssr",
    "positions": [
      "defender"
    ],
    "tacticalRoles": [
      "assault"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害減少 12%",
        "effects": [
          {
            "type": "normalAttackDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "對其他玩家傷害增加 30%",
        "effects": [
          {
            "type": "playerDamageUp",
            "value": 30,
            "unit": "percent",
            "target": "其他玩家"
          }
        ]
      }
    ],
    "tags": [
      "失落之城 S1",
      "S1 電影大亨"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Harper",
    "name": "哈珀 Harper",
    "faction": "glory",
    "rarity": "ssr",
    "positions": [
      "defender"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害減少 12%",
        "effects": [
          {
            "type": "normalAttackDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "技能傷害減少 12%",
        "effects": [
          {
            "type": "skillDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "月卡"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Candice",
    "name": "坎迪斯 Candice",
    "faction": "prowess",
    "rarity": "ssr",
    "positions": [
      "defender"
    ],
    "tacticalRoles": [
      "garrison"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
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
      {
        "slot": 3,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "祈願",
      "新手適合",
      "低課適合",
      "最強轉生者"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Vivienne",
    "name": "維維安 Vivienne",
    "faction": "prowess",
    "rarity": "ssr",
    "positions": [
      "striker"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "技能傷害增加 20%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 20,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "提升行車速度 75%",
        "effects": [
          {
            "type": "marchSpeedUp",
            "value": 75,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "祈願",
      "新手適合",
      "低課適合",
      "巨龍之寶"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Faye",
    "name": "菲伊 Faye",
    "faction": "prowess",
    "rarity": "ssr",
    "positions": [
      "striker"
    ],
    "tacticalRoles": [
      "assault"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "技能傷害增加 20%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 20,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "單兵出擊冒險者容量增加 10%",
        "effects": [
          {
            "type": "soloCapacityUp",
            "value": 10,
            "unit": "percent",
            "target": "單兵出擊"
          }
        ]
      }
    ],
    "tags": [
      "低課適合",
      "VIP 禮包"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Sena",
    "name": "塞納 Sena",
    "faction": "prowess",
    "rarity": "ssr",
    "positions": [
      "striker"
    ],
    "tacticalRoles": [
      "assault"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "單兵出擊冒險者容量增加 10%",
        "effects": [
          {
            "type": "soloCapacityUp",
            "value": 10,
            "unit": "percent",
            "target": "單兵出擊"
          }
        ]
      }
    ],
    "tags": [
      "失落之城 S1",
      "S1 巨龍之寶"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Faro",
    "name": "法蘿 Faro",
    "faction": "prowess",
    "rarity": "ssr",
    "positions": [
      "defender"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害減少 12%",
        "effects": [
          {
            "type": "normalAttackDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "寒霜之地 S1",
      "S1 電影大亨"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Vanessa",
    "name": "凡妮莎 Vanessa",
    "faction": "wealth",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
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
      {
        "slot": 3,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "新手適合",
      "世界探索",
      "祈願"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Penelope",
    "name": "珀涅羅珀 Penelope",
    "faction": "wealth",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
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
      {
        "slot": 3,
        "description": "技能傷害減少 12%",
        "effects": [
          {
            "type": "skillDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "祈願"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Aetheria",
    "name": "艾瑟雅 Aetheria",
    "faction": "wealth",
    "rarity": "ssr",
    "positions": [
      "defender"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "技能傷害減少 12%",
        "effects": [
          {
            "type": "skillDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "普攻傷害減少 12%",
        "effects": [
          {
            "type": "normalAttackDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "月卡"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Eden",
    "name": "伊甸 Eden",
    "faction": "wealth",
    "rarity": "ssr",
    "positions": [
      "striker"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "技能傷害減少 12%",
        "effects": [
          {
            "type": "skillDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "普攻傷害減少 12%",
        "effects": [
          {
            "type": "normalAttackDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "失落之城 S1",
      "S1 電影大亨"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Tonitru",
    "name": "托妮露 Tonitru",
    "faction": "wealth",
    "rarity": "ssr",
    "positions": [
      "defender"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "技能傷害減少 12%",
        "effects": [
          {
            "type": "skillDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "普攻傷害減少 12%",
        "effects": [
          {
            "type": "normalAttackDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "寒霜之地 S1",
      "S1 電影大亨"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Vita",
    "name": "維塔 Vita",
    "faction": "wealth",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [
      "assault"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "單兵出擊冒險者容量增加 10%",
        "effects": [
          {
            "type": "soloCapacityUp",
            "value": 10,
            "unit": "percent",
            "target": "單兵出擊"
          }
        ]
      }
    ],
    "tags": [
      "失落之城 S2",
      "S2 預熱"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Elysia",
    "name": "艾麗西亞 Elysia",
    "faction": "passion",
    "rarity": "ssr",
    "positions": [
      "striker"
    ],
    "tacticalRoles": [
      "general"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "技能傷害增加 20%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 20,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "祈願",
      "新手適合",
      "低課適合"
    ],
    "synergyPartnerIds": [
      "Minna 01",
      "Candice"
    ]
  },
  {
    "id": "Kirigawa Kiriko",
    "name": "栖川霧子 Kirigawa Kiriko",
    "faction": "passion",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [
      "general"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "技能傷害增加 20%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 20,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "失落之城 S1",
      "S1 商店"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Luka Dillon",
    "name": "盧卡 Luka Dillon",
    "faction": "passion",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害減少 12%",
        "effects": [
          {
            "type": "normalAttackDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "技能傷害增加 20%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 20,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "位面之戰"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Solana",
    "name": "索拉娜 Solana",
    "faction": "passion",
    "rarity": "ssr",
    "positions": [
      "defender"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害減少 12%",
        "effects": [
          {
            "type": "normalAttackDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "失落之城 S2",
      "S2 商店"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Lucifer",
    "name": "路西法 Lucifer",
    "faction": "passion",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害減少 12%",
        "effects": [
          {
            "type": "normalAttackDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "技能傷害增加 20%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 20,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "祈願"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Leoni",
    "name": "雷奧妮 Leoni",
    "faction": "passion",
    "rarity": "ssr",
    "positions": [
      "defender"
    ],
    "tacticalRoles": [],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害減少 12%",
        "effects": [
          {
            "type": "normalAttackDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "技能傷害減少 12%",
        "effects": [
          {
            "type": "skillDamageDown",
            "value": 12,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "天空之境"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Mimir",
    "name": "彌米爾 Mimir",
    "faction": "passion",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [
      "siege",
      "rally"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
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
      }
    ],
    "tags": [
      "VIP 10",
      "重課專屬"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Stona",
    "name": "絲托妠 Stona",
    "faction": "passion",
    "rarity": "ssr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [
      "assault"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
        "description": "技能傷害增加 30%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 30,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "對其他玩家傷害增加 30%",
        "effects": [
          {
            "type": "playerDamageUp",
            "value": 30,
            "unit": "percent",
            "target": "其他玩家"
          }
        ]
      }
    ],
    "tags": [
      "拍賣會"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Nivea",
    "name": "妮維雅 Nivea",
    "faction": "passion",
    "rarity": "ssr",
    "positions": [
      "striker"
    ],
    "tacticalRoles": [
      "rally"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
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
      {
        "slot": 3,
        "description": "對其他玩家傷害增加 20%",
        "effects": [
          {
            "type": "playerDamageUp",
            "value": 20,
            "unit": "percent",
            "target": "其他玩家"
          }
        ]
      }
    ],
    "tags": [
      "寒霜之地 S1",
      "S1 預熱"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Verdict",
    "name": "薇爾迪克 Verdict",
    "faction": "prowess",
    "rarity": "ssr",
    "positions": [
      "defender"
    ],
    "tacticalRoles": [
      "assault"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
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
      {
        "slot": 3,
        "description": "單兵出擊冒險者容量增加 10%",
        "effects": [
          {
            "type": "soloCapacityUp",
            "value": 10,
            "unit": "percent",
            "target": "單兵出擊"
          }
        ]
      }
    ],
    "tags": [
      "寒霜之地 S2",
      "S2 商城"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Jacinthe",
    "name": "雅辛特 Jacinthe",
    "faction": "glory",
    "rarity": "sr",
    "positions": [
      "captain"
    ],
    "tacticalRoles": [
      "stamina"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
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
      {
        "slot": 3,
        "description": "技能傷害增加 5%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 5,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "黃金史萊姆王"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Maureen",
    "name": "墨琳 Maureen",
    "faction": "wealth",
    "rarity": "ssr",
    "positions": [
      "striker"
    ],
    "tacticalRoles": [
      "garrison"
    ],
    "worldSkills": [
      {
        "slot": 1,
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
      {
        "slot": 2,
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
      {
        "slot": 3,
        "description": "對世界守衛傷害增加 30%",
        "effects": [
          {
            "type": "worldGuardianDamageUp",
            "value": 30,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "寒霜之地 S2",
      "S2 巨龍之寶"
    ],
    "synergyPartnerIds": []
  },
  {
    "id": "Carmillian",
    "name": "卡蜜莉安 Carmillian",
    "faction": "truth",
    "rarity": "ssr",
    "positions": [
      "defender"
    ],
    "tacticalRoles": [
      "general"
    ],
    "worldSkills": [
      {
        "slot": 1,
        "description": "每 10 秒釋放一次傷害係數為 1800% 的攻擊",
        "effects": [
          {
            "type": "periodicDamage",
            "value": 1800,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 2,
        "description": "技能傷害增加 20%",
        "effects": [
          {
            "type": "skillDamageUp",
            "value": 20,
            "unit": "percent"
          }
        ]
      },
      {
        "slot": 3,
        "description": "普攻傷害增加 50%",
        "effects": [
          {
            "type": "normalAttackDamageUp",
            "value": 50,
            "unit": "percent"
          }
        ]
      }
    ],
    "tags": [
      "寒霜之地 S2",
      "S2 預熱"
    ],
    "synergyPartnerIds": []
  }
] satisfies Hero[];
