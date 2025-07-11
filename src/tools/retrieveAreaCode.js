// src/tools/getSaleProductSchedule.js
import { z } from "zod";
import { packageService } from "../services/packageService.js";
import logger from "../utils/logger.cjs";
import { stripHtml } from "../utils/stripHtml.js";
import { cleanObject } from "../utils/objectUtils.js";

export const retrieveAreaCodeTool = {
  name: "retrieveAreaCode",
  description: `
    지역, 국가, 대륙에 대한 정보를 조회합니다.
    예시: "동남아 지역 찾아줘" → 이 함수를 실행하여 결과를 확인한 뒤 동남아에 해당하는 코드를 선택하세요.
  `,
  inputSchema: z.object({}), // 파라미터 없음
  async handler() {
    try {
      const areaCodeList = await packageService.retrieveAreaCode();

      const cleanAreaCodeList = cleanObject(areaCodeList);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                areaCodeList: cleanAreaCodeList,
                retrievedAt: new Date().toISOString(),
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      logger.error(`Error in retrieveAreaCode: ${error.message}`, {
        error: error.stack,
      });
      throw error;
    }
  },
};
