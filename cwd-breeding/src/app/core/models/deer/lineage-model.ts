export interface LineageModel {
    firstGeneration: Parentage;
    secondGeneration: ParentagePair;
    thirdGeneration: ParentageQuad;
}

export interface Parentage {
    sire: DeerLineageModel;
    dam: DeerLineageModel;
}

export interface ParentagePair {
    sirePair: Parentage;
    damPair: Parentage;
}

export interface ParentageQuad {
    sireQuad: ParentagePair;
    damQuad: ParentagePair;  
}

export interface DeerLineageModel {
    deerId: string | null;
    name: string;
}
