type Logic = 'binary' | 'and' | 'or' | 'not'

type RightValue = string | number | boolean | null

type RefArgument = { name: string, value: RightValue }

type RightArgument = RefArgument | RightValue

type Expression = [string, OperationType, RightArgument] | { and: Expression[] } | { or: Expression[] } | { not: Expression }

type Effect = "allow" | "deny"

type Policy = {
  description: string;
  effect: Effect;
  filter: Expression;
  permissions: string[];
}
