import { BuildImportForm } from "../../components/BuildImportForm";
import { useRecoilState, useResetRecoilState } from "recoil";
import { withScrollRestoration } from "../../utility/withScrollRestoration";
import { buildDataSelector } from "../../state/build-data";
import { searchStringsAtom } from "../../state/search-strings";
import { BuildInfoForm, GemOrderList } from "../../components/BuildEditForm";
import { formStyles } from "../../components/Form";
import { withBlank } from "../../utility/withBlank";
import { requiredGemsSelector } from "../../state/gem";
import { buildTreesSelector } from "../../state/tree/build-tree";
import classNames from "classnames";
import styles from "./styles.module.css";

function BuildContainer() {
  const [buildData, setBuildData] = useRecoilState(buildDataSelector);
  const resetBuildData = useResetRecoilState(buildDataSelector);

  const [requiredGems, setRequiredGems] = useRecoilState(requiredGemsSelector);
  const resetRequiredGems = useResetRecoilState(requiredGemsSelector);

  const [buildTrees, setBuildTreesSelector] =
    useRecoilState(buildTreesSelector);
  const resetBuildTreesSelector = useResetRecoilState(buildTreesSelector);

  return (
    <div>
      <BuildInfoForm
        buildData={buildData}
        onSubmit={(buildData) => {
          setBuildData(buildData);
        }}
      />
      <hr />
      <div className={classNames(formStyles.form)}>
        <EditSearchStrings />
        <BuildImportForm
          onSubmit={(pobData) => {
            setBuildData(pobData.buildData);
            setRequiredGems(pobData.requiredGems);
            setBuildTreesSelector(pobData.buildTrees);
          }}
          onReset={() => {
            resetBuildData();
            resetRequiredGems();
            resetBuildTreesSelector();
          }}
        />
      </div>
      <hr />
      {requiredGems.length > 0 && (
        <>
          <GemOrderList
            requiredGems={requiredGems}
            onUpdate={(requiredGems) => {
              setRequiredGems(requiredGems);
            }}
          />
          <hr />
        </>
      )}
    </div>
  );
}

function EditSearchStrings() {
  const [searchStrings, setSearchStrings] = useRecoilState(searchStringsAtom);

  return (
    <div className={classNames(formStyles.formRow)}>
      <label>
        Search Strings {"("}
        <a href="https://poe.re/" target="_blank">
          Path of Exile Regex
        </a>
        {")"}
      </label>
      <textarea
        spellCheck={false}
        className={classNames(formStyles.formInput, styles.searchStringsInput)}
        value={searchStrings?.join("\n")}
        onChange={(e) => {
          if (e.target.value.length == 0) setSearchStrings(null);
          else
            setSearchStrings(
              e.target.value.split(/\r\n|\r|\n/).map((x) => x.trim())
            );
        }}
        aria-label="Search Strings"
      />
    </div>
  );
}

export default withBlank(withScrollRestoration(BuildContainer));
