"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetAttributeRulesDto } from "@/app/dto/attribute-values/get-attribute-rules.dto";
import React, { useState } from "react";
import AttributeRulesDataGrid from "@/components/admin/ajustes/attribute-rules-datagrid/AttributeRulesDataGrid";
import AttributeRulesModal from "@/components/admin/ajustes/attribute-rules-modal/AttributeRulesModal";
import { CreateAttributeRuleDto } from "@/app/dto/attribute-values/create-attribute-rule.dto";
import { upsertAttributeRule } from "@/app/api/attribute-values/atrribute-values";
import toast from "react-hot-toast";

export default function Rules() {
  const pathname = usePathname();
  const router = useSearchParams();
  const [attributeRule, setAttributeRule] =
    useState<GetAttributeRulesDto | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const params = useParams();
  const { data, isLoading } = useSWR<GetAttributeRulesDto[]>(
    `${environment.baseUrl}/extended/attribute/rules?sectionAttributeId=${params?.id}`,
    fetcher,
  );

  const handleOpenChange = () => {
    setIsOpen(true);
  };

  const handleOnCloseChange = () => {
    setIsOpen(false);
    setAttributeRule(null);
  };

  const handleOnSelectChange = (keys: string) => {
    const attribute: GetAttributeRulesDto = JSON.parse(JSON.parse(keys));
    setAttributeRule(attribute);
    setIsOpen(true);
  };

  const handleSubmit = async (
    payload: CreateAttributeRuleDto,
    reset: () => void,
  ) => {
    if (attributeRule) {
      const { data } = await upsertAttributeRule({
        ...payload,
        triggerAttributeId: Number(payload.triggerAttributeId),
        targetAttributeId: Number(payload.targetAttributeId),
        id: payload.id,
      });

      if (data) {
        setIsOpen(false);
        toast.success("La regla fue editada correctamente");
        setAttributeRule(null);
        return reset();
      }
    }

    const { data } = await upsertAttributeRule({
      ...payload,
      triggerAttributeId: Number(payload.triggerAttributeId),
      targetAttributeId: Number(payload.targetAttributeId),
    });

    if (data) {
      setIsOpen(false);
      toast.success("La regla fue creada correctamente");

      return reset();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <BreadcrumbsPath pathname={pathname} />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-cerulean-950">
          Reglas para {router.get("name").toLowerCase()}
        </h1>
      </div>
      <AttributeRulesModal
        attributeRule={attributeRule}
        moduleId={Number(router?.get("moduleId"))}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        onCloseChange={handleOnCloseChange}
        handleSubmit={handleSubmit}
        sectionAttributeId={Number(params?.id)}
        title={attributeRule ? "Editar regla" : "Nueva regla"}
      />
      <AttributeRulesDataGrid
        rules={data ? data : []}
        onOpenChange={handleOpenChange}
        onSelectionChange={handleOnSelectChange}
        loading={isLoading}
      />
    </div>
  );
}
